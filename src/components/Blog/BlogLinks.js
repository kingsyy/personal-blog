import ExportedImage from 'next-image-export-optimizer';
import { allBlogs } from 'contentlayer/generated';
import { sortBlogs } from "@/src/utils";
import Link from 'next/link';
import React from 'react'

const getAdjacentBlog = (sortedBlogs, currentBlog, direction) => {
    const currentBlogIndex = sortedBlogs.findIndex((blog) => blog._raw.flattenedPath === currentBlog._raw.flattenedPath);
    const adjacentIndex = direction === 'next' ? currentBlogIndex - 1 : currentBlogIndex + 1;
    return sortedBlogs[adjacentIndex];
};

const BlogSquare = ({ blog, direction, category }) => {
    return blog ? (
        <div className='relative'>
            <ExportedImage src={blog.image.filePath.replace("../public", "")}
                placeholder='blur'
                blurDataURL={blog.image.blurhashDataUrl}
                alt={blog?.title}
                fill
                className='w-full h-full object-center object-cover rounded-3xl !my-0'
                sizes='100vw'
                priority
            />
                 <div className="absolute top-0 left-0 bottom-0 right-0 h-full
                        bg-gradient-to-b from-transparent from-0% to-dark/90 rounded-3xl
                        "
            />
            <div className='w-full flex flex-col items-start justify-center relative'>
                <Link href={blog.url} className='mt-6'>
                    <p className='text-light text-s lg:text-m mx-5'>{blog.title}</p>    
                </Link>
            </div>
        </div>
    ) : (
        <EmptySquare text={`No ${direction === 'next' ? 'newer' : 'older'} blogs in ${category} project yet.`}/>
    )
};

const EmptySquare = ({ text }) => {
    return (
        <div className='rounded-3xl prose relative border-[1px] border-solid border-dark dark:border-light'>
            <Link href="/categories/all" className="mx-2">
                <p className='text-dark dark:text-light mx-5 underline text-s lg:text-m'>{text} Click here to see all blogs.</p>    
            </Link>
        </div>
    );
};

const BlogLinks = ({ currentBlog }) => {
    const category = currentBlog.tags.length > 0 ? currentBlog.tags[0] : null;
    const sortedBlogs = sortBlogs(allBlogs.filter(b => b.tags.some(t => t === category)));
    const previousBlog = getAdjacentBlog(sortedBlogs, currentBlog, "previous");
    const nextBlog = getAdjacentBlog(sortedBlogs, currentBlog, "next");

    return previousBlog || nextBlog ? (
        <div className="flex flex-col sm:flex-row justify-around gap-5 pt-5">
            <BlogSquare blog={previousBlog} direction="previous" category={category} />
            <BlogSquare blog={nextBlog} direction="next" category={category} />
        </div>
    ) : (
        <EmptySquare text="No other blogs in this project."/>
    );
};

export default BlogLinks;