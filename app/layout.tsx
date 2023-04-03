import "./globals.css";
import Header from "./(components)/Header";
import Footer from "./(components)/Footer";
import Cart from "./(components)/Cart";
import Menu from "./(components)/Menu";
import CartContext from "./(context)/CartContext";
import MenuContext from "./(context)/MenuContext";
import localFont from "@next/font/local";
import supabase from "@/utils/supabase";

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let { data: product_category, error } = await supabase
    .from("product_category")
    .select("*")
    .order("category_name", { ascending: false });

  const categoryPages = product_category?.map(({ category_name }) => ({
    name: category_name,
    link: `/products/category/${category_name}`,
  }));

  const mainLinks: null[] = [
    // { name: "home", link: "/" },
    // { name: "shop all", link: "/products" },
  ];

  // @ts-ignore
  const links = categoryPages ? mainLinks.concat(categoryPages) : mainLinks;

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="bg-gray-100">
        <MenuContext>
          <CartContext>
            <Header links={links} />
            <Cart />
            <Menu links={links} />
            <div className="mt-8">{children}</div>
            <Footer links={links} />
          </CartContext>
        </MenuContext>
      </body>
    </html>
  );
}
