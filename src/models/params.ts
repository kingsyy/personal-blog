
import { Blog } from "@/contentlayer"
import { CategoryItem, ImageInfo } from ".";

export type SlugParam = {
    params: BlogSlug;
}

type BlogSlug = {
    slug: string;
}

export type ImageCarrouselParam ={
    images: ImageInfo[];
}

export type CategoriesParam = {
    categories: CategoryItem[];
    currentSlug: string;
}

export type BlogsParam = {
    blogs: Blog[];
}

export type BlogParam = {
    blog: Blog;
}

export type CategoryParam = {
    link?: string;
    name: string;
    active: boolean;
    className?: string;
}

export type TextParam = {
    text: string;
}

export type TextsParam = {
    texts: string[];
}