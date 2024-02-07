import { compareDesc, parseISO } from "date-fns";
import { Blog } from "@/contentlayer"
import { BlogValues } from "@/models/index";

export const cx = (...classNames: string[]) => classNames.filter(Boolean).join(" ");

export const sortBlogs = (blogs: Blog[]) => {
  return blogs
    .slice()
    .sort((a, b) =>
      compareDesc(parseISO(a.publishedAt), parseISO(b.publishedAt))
    );
};

export const GetNullableFields = (blog: Blog | undefined): BlogValues => {
  if (!blog) {
    return { project: "", imageUrl: "", blurHashDataUrl: "", imageHeight: 0, imageWidth: 0 };
  }
  const imageUrl = blog.image?.filePath.replace("../public", "") ?? "";
  const imageHeight = blog.image?.height ?? 0;
  const imageWidth = blog.image?.width ?? 0;
  const blurHashDataUrl = blog.image?.blurhashDataUrl ?? "";
  const project = blog.tags && blog.tags.length > 0 ? blog.tags[0] : "";
  return { project, imageUrl, blurHashDataUrl, imageHeight, imageWidth };
}