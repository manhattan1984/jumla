"use client";
import Image from "next/image";
import Link from "next/link";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import CarouselImage from "./(components)/CarouselImage";
import PageWrapper from "./(components)/PageWrapper";
import ProductList from "./(components)/ProductList";
import { useCart } from "./(context)/CartContext";

export default function HomePage({ product, categories }) {
  return (
    <PageWrapper className="">
      <div>
        <Carousel
          showArrows={false}
          showStatus={false}
          autoPlay={true}
          infiniteLoop={true}
          interval={2000}
        >
          <div className="">
            <Image
              src={
                "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
              }
              height={0}
              width={0}
              sizes="100%"
              className="h-auto w-full"
              alt="shopping image"
            />
          </div>
          <div className="">
            <Image
              src={
                "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
              }
              height={0}
              width={0}
              sizes="100%"
              className="h-auto w-full"
              alt="shopping image"
            />
          </div>
          <div className="">
            <Image
              src={
                "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
              }
              height={0}
              width={0}
              sizes="100%"
              className="h-auto w-full"
              alt="shopping image"
            />
          </div>
        </Carousel>
      </div>
      <div className="bg-white py-2 grid grid-cols-4">
        {categories.map(({ category_name, category_image }) => (
          <Link href={`/products/category/${category_name}`}>
            <div className="flex flex-col items-center">
              <Image
                src={category_image}
                height={0}
                width={0}
                sizes="100%"
                className="h-20 w-20 object-cover"
                alt={category_name}
              />
              <p className="text-xs mt-2">{category_name}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="">
        <ProductList products={product} title='Featured Products' />
      </div>
    </PageWrapper>
  );
}
