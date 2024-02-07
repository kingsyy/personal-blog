import { Blog } from "@/contentlayer";
import { StaticImageData } from "next/image";


export type BlogLinkItem = {
    blog: Blog;
    direction:string;
    category: string | null;
}

export type BlogValues = {
    project: string;
    imageUrl: string;
    blurHashDataUrl: string;
    imageWidth: number;
    imageHeight: number;
}

export type ImageInfo = {
    source: StaticImageData;
    alt: string;
}


export type CategoryItem = {
    name: string;
    slug: string;
}

export type ToC = {
        level: string;
        text: string;
        slug: string,
}