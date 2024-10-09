import ExportedImage from 'next-image-export-optimizer';
import { allBlogs, Blog } from '@/contentlayer';
import { GetNullableFields, sortBlogs } from "@/utils/index";
import Link from 'next/link';
import React from 'react'
import { BlogParam, TextParam } from '@/models/params';
import { BlogLinkItem } from '@/models/index';

const getAdjacentBlog = (sortedBlogs: Blog[], currentBlog: Blog | undefined, direction: string) => {
    const currentBlogIndex = sortedBlogs.findIndex((blog) => blog._raw.flattenedPath === currentBlog?._raw.flattenedPath);
    const adjacentIndex = direction === 'next' ? currentBlogIndex - 1 : currentBlogIndex + 1;
    return sortedBlogs[adjacentIndex];
};

const BlogSquare = ({ blog, direction, category }: BlogLinkItem) => {
    const blogValues = GetNullableFields(blog);
    return blog ? (
        <div className="relative rounded-lg overflow-hidden shadow-lg">
            <ExportedImage src={blogValues.imageUrl}
                placeholder='blur'
                blurDataURL={blogValues.blurHashDataUrl}
                alt={blog?.title}
                fill
                className="object-cover w-full h-full"
                layout="fill"
                priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                <Link href={blog.url} className="text-white text-center">
                    <p className="font-bold text-lg">{blog.title}</p>
                    <p className="text-sm">{direction === 'next' ? 'Next' : 'Previous'} in {category}</p>
                </Link>
            </div>

            {/* <div className="absolute top-0 left-0 bottom-0 right-0 h-full
                        bg-gradient-to-b from-transparent from-0% to-dark/90 rounded-3xl
                        "
            />
            <div className='w-full flex flex-col items-start justify-center relative'>
                <Link href={blog.url} className='mt-6'>
                    <p className='text-light text-s lg:text-m mx-5'>{blog.title}</p>    
                </Link>
            </div> */}

        </div>
    ) : (
        <EmptySquare text={`No ${direction === 'next' ? 'newer' : 'older'} blogs in ${category} project yet.`}/>
    );
};

const EmptySquare = ({ text }: TextParam) => {
    return (
    //     <div className='rounded-3xl prose relative border-[1px] border-solid border-dark dark:border-light'>
        // <Link href="/categories/all" className="mx-2">
        //     <p className='text-dark dark:text-light mx-5 underline text-s lg:text-m'>{text} Click here to see all blogs.</p>    
        // </Link>
    // </div>
        <div className="rounded-3xl border-[1px] border-solid border-dark dark:border-light flex items-center justify-center">
            <span className="text-dark dark:text-light mx-5 text-s lg:text-m text-center p-5">
                
                <Link href="/categories/all" >
                    {text}
                    <p className="hover:underline">Click here to see all blogs.</p>    
                </Link>
            </span>
        </div>
    );
};

const BlogLinks = ({ blog }: BlogParam) => {
    const category = blog.tags && blog.tags.length > 0 ? blog.tags[0] : null;
    const sortedBlogs = sortBlogs(allBlogs.filter(b => b.tags?.some(t => t === category) ?? false));
    const previousBlog = getAdjacentBlog(sortedBlogs, blog, "previous");
    const nextBlog = getAdjacentBlog(sortedBlogs, blog, "next");

    return previousBlog || nextBlog ? (
        <div >
            <BlogSquare blog={previousBlog} direction="previous" category={category} />
            <BlogSquare blog={nextBlog} direction="next" category={category} />
        </div>
    ) : (
        <EmptySquare text="No other blogs in this project."/>

    );
};

export default BlogLinks;
