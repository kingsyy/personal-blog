import { format, parseISO } from "date-fns";
import Link from "next/link";
import React from "react";
import { slug } from "github-slugger";
import { BlogParam } from "@/models/params";
import { GetNullableFields } from "@/utils/index";

const BlogDetails = ({ blog }: BlogParam) => {
  const blogValues = GetNullableFields(blog);
  return (
    <div className="px-2  md:px-10 bg-accent dark:bg-accentDark text-light dark:text-dark py-2 flex items-center justify-around flex-wrap text-lg sm:text-xl font-medium mx-5  md:mx-10 rounded-lg">
      <time className="m-3">
        {format(parseISO(blog.publishedAt), "LLLL d, yyyy")}
      </time>
      <div className="m-3">{blog.readingTime.text}</div>
      <Link href={`/categories/${slug(blogValues.project)}`} className="m-3">
        #{blogValues.project}
      </Link>
    </div>
  );
};

export default BlogDetails;
