import ExportedImage from 'next-image-export-optimizer';
import { allBlogs, Blog } from '@/contentlayer';
import { GetNullableFields, sortBlogs } from "@/utils/index";
import Link from 'next/link';
import React from 'react'
import { BlogParam, TextParam, TextsParam } from '@/models/params';
import { BlogLinkItem } from '@/models/index';

const getAdjacentBlog = (sortedBlogs: Blog[], currentBlog: Blog | undefined, direction: string) => {
    const currentBlogIndex = sortedBlogs.findIndex((blog) => blog._raw.flattenedPath === currentBlog?._raw.flattenedPath);
    const adjacentIndex = direction === 'next' ? currentBlogIndex - 1 : currentBlogIndex + 1;
    return sortedBlogs[adjacentIndex];
};

const BlogSquare = ({ blog, direction, category }: BlogLinkItem) => {
    const blogValues = GetNullableFields(blog);
    return blog ? (
        <div className="group relative inline-block overflow-hidden rounded-xl w-full h-full lg:max-h-40">
            <div className="absolute inset-0 h-full bg-gradient-to-b from-transparent to-dark/90 rounded-xl z-10" />
            <ExportedImage
                src={blogValues.imageUrl}
                placeholder="blur"
                blurDataURL={blogValues.blurHashDataUrl}
                alt={blog.title}
                width={blogValues.imageWidth}
                height={blogValues.imageHeight}
                className="w-full h-full object-center object-cover rounded-xl group-hover:scale-105 transition-all ease duration-300"
            />

            <div className="absolute inset-0 flex flex-col justify-end items-center text-center p-4 xs:p-6 sm:p-10 z-20 ">
                <Link href={blog.url} className="mt-4 text-light text-xl md:text-2xl">
                    <h3 >{direction === 'next' ? 'Next' : 'Previous'} in {category}:</h3>
                    <h2 className="font-bold capitalize">
                        <span className="bg-gradient-to-r from-accent to-accent bg-[length:0px_6px] dark:from-accentDark/50 dark:to-accentDark/50 group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
                            {blog.title}
                        </span>
                    </h2>
                </Link>
            </div>
        </div>
    ) : (
        <EmptySquare texts={[`No ${direction === 'next' ? 'newer' : 'older'} blogs in ${category} project yet.`]} />
    );
};

const EmptySquare = ({ texts }: TextsParam) => {
    return (
        <div className="rounded-3xl border-[2px] border-solid border-dark dark:border-light flex items-center justify-center">
        <span className="text-dark dark:text-light mx-5 p-5 text-xl md:text-2xl text-center font-bold">
          <Link href="/categories/all" className="flex-col">
            {texts[0]}
            <h3 className="mt-2 bg-gradient-to-r from-accent to-accent bg-[length:0px_6px] dark:from-accentDark/50 dark:to-accentDark/50 hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
              Click here to see all blogs posts.
            </h3>
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
        <div className='flex flex-col sm:flex-row justify-around gap-5 pt-5 pb-8 px-5 md:px-10' >
            <BlogSquare blog={previousBlog} direction="previous" category={category} />
            <BlogSquare blog={nextBlog} direction="next" category={category} />
        </div>
    ) : (
        <EmptySquare texts={["No other blogs in this project."]} />
    );
};

export default BlogLinks;
