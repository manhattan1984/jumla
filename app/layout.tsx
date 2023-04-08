import "./globals.css";
import Header from "./(components)/Header";
import Footer from "./(components)/Footer";
import Cart from "./(components)/Cart";
import Menu from "./(components)/Menu";
import CartContext from "./(context)/CartContext";
import MenuContext from "./(context)/MenuContext";
import { CheckoutProvider } from "./(context)/CheckoutContext";
import { commerce } from "@/utils/commerce";
import { CategoryType } from "@/utils/type";

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const mainLinks: { name: string; link: string }[] = [
    // { name: "home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];

  const { data: categories }: { data: CategoryType[] } =
    await commerce.categories.list();

  const categoryPages = categories.map(({ name, slug }) => ({
    name,
    link: `/category/${slug}`,
  }));

  // @ts-ignore
  const links = categoryPages ? [...categoryPages, ...mainLinks] : mainLinks;

  return (
    <html lang="en" className="scroll-smooth">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="bg-gray-100">
        <MenuContext>
          <CartContext>
            <CheckoutProvider>
              <Header links={links} />
              <Cart />
              <Menu links={links} />
              <div className="mt-8 h-full">{children}</div>
              <Footer links={mainLinks} />
            </CheckoutProvider>
          </CartContext>
        </MenuContext>
      </body>
    </html>
  );
}
