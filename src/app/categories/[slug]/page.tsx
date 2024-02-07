import { allBlogs } from "@/contentlayer";
import BlogLayoutThree from "@/components/Blog/BlogLayoutThree";
import Categories from "@/components/Blog/Categories";
import GithubSlugger, { slug } from "github-slugger";
import { SlugParam } from "@/models/params";

const slugger = new GithubSlugger();

export async function generateStaticParams() {
  const categories: string[] = [];
  const paths = [{ slug: "all" }];

  allBlogs.map((blog) => {
    if (blog.isPublished) {
      blog.tags?.map((tag) => {
        let slugified = slugger.slug(tag);
        if (!categories.includes(slugified)) {
          categories.push(slugified);
          paths.push({ slug: slugified });
        }
      });
    }
  });

  return paths;
}

export async function generateMetadata({ params }: SlugParam) {
  return {
    title: `${params.slug.replaceAll("-"," ")} Blogs`,
    description: `Learn more about ${params.slug === "all" ? "web development" : params.slug} through our collection of blogs and tutorials`,
  };
}

function getAllCategories() {
  const uniqueTags = new Set(allBlogs.flatMap((blog) => blog.tags ?? []));
  uniqueTags.add("all");
  return Array.from(uniqueTags)
      .map(category => ({
          slug: slug(category),
          name: category,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
}

function getBlogs(category: string) {
  return category === "all" ? allBlogs :
  allBlogs.filter((blog) => blog.tags?.some(tag => slug(tag) === category));
}

const CategoryPage = ({ params }: SlugParam) => {
  const allCategories = getAllCategories();
  const blogs = getBlogs(params.slug);
  const currentCategory = allCategories.find(category => category.slug === params.slug)?.name ?? params.slug;
  return (
    <article className="mt-12 flex flex-col text-dark dark:text-light">
      <div className=" px-5 sm:px-10  md:px-24  sxl:px-32 flex flex-col">
        <h1 className="mt-6 font-semibold text-2xl md:text-4xl lg:text-5xl capitalize" >{currentCategory}</h1>
        <span className="mt-2 inline-block">
          Discover more categories and expand your knowledge!
        </span>
      </div>
      <Categories categories={allCategories} currentSlug={params.slug} />

      <div className="grid  grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 grid-rows-2 gap-16 mt-5 sm:mt-10 md:mt-24 sxl:mt-32 px-5 sm:px-10 md:px-24 sxl:px-32">
        {blogs.map((blog, index) => (
          <article key={index} className="col-span-1 row-span-1 relative">
            <BlogLayoutThree blog={blog} />
          </article>
        ))}
      </div>
    </article>
  );
};

// type BlogCategory = {
//   slug:string;
//   name:String;
// }

export default CategoryPage;

