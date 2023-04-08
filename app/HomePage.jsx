"use client";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import CategoryList from "./(components)/CategoryList";
import ProductsList from "./(components)/ProductsList";
import PageWrapper from "./(components)/PageWrapper";
import responsive from "@/utils/responsive";

export default function HomePage({ products, categories }) {
  const images = [
    "https://images.unsplash.com/photo-1591815302525-756a9bcc3425?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    "https://images.unsplash.com/photo-1514218842929-d6b0d653a623?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    "https://images.unsplash.com/photo-1489359413553-6c264fb36c83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGFwcGxlJTIwY2hhcmdlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  ];
  return (
    <PageWrapper>
      <div className="">
        <div className="relative h-full min-h-screen">
          <div className="relative brightness-50">
            <Carousel
              responsive={responsive}
              swipeable={true}
              infinite={true}
              transitionDuration={500}
              autoPlay={true}
              autoPlaySpeed={2000}
              arrows={false}
            >
              {images.map((image, index) => (
                <Image
                  src={image}
                  sizes="100%"
                  className="h-screen w-full object-cover"
                  width={0}
                  height={0}
                  alt="image"
                />
              ))}
            </Carousel>
          </div>
          <div className="text-center mt-4 mb-8 absolute top-1/3 text-white w-full">
            <p className="text-2xl mb-1">Welcome To Jumla</p>
            <p>
              Nigeria's Premier Apple Products Store, where we sell the best
              products at the best price.
            </p>
            <a
              href="/#latest"
              className="mt-4 inline-block bg-orange-400 text-white p-2"
            >
              Shop Now
            </a>
          </div>
        </div>
        <div className="mt-4 mx-2">
          <CategoryList categories={categories} />
        </div>
        <section id="latest">
          <ProductsList title={"Latest Releases"} products={products} />
        </section>
      </div>
    </PageWrapper>
  );
}
