"use client";

import { Prisma } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import Products from "./products";
import { CartContext } from "../context/cart";
import { formatCurrency } from "@/helpers/format-currency";
import CartSheet from "./cart-sheet";

interface RestaurantCategoriesProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      menuCategories: {
        include: { products: true };
      };
    };
  }>;
}

type MenuCategoriesWithProcuts = Prisma.MenuCategoryGetPayload<{
  include: {
    products: true;
  };
}>;

const RestaurantCategories = ({ restaurant }: RestaurantCategoriesProps) => {
  const [selectedCategory, setSelectCategory] =
    useState<MenuCategoriesWithProcuts>(restaurant.menuCategories[0]);
  const handleCategorieClick = (category: MenuCategoriesWithProcuts) => {
    setSelectCategory(category);
  };

  const {products, total, toggleCart, totalQuantity} = useContext(CartContext)

  const getCategoryButtonVariant = (category: MenuCategoriesWithProcuts) => {
    return selectedCategory.id === category.id ? "default" : "secondary";
  };

  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl  bg-white">
      <div className="p-5">
        <div className="item-center flex gap-3">
          <Image
            src={restaurant.avatarImageUrl}
            alt={restaurant.name}
            height={45}
            width={45}
          />
          <div>
            <h2 className="text-lg font-semibold">{restaurant.name}</h2>
            <p className="text-xs opacity-55">{restaurant.description}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1 text-xs text-green-500">
          <ClockIcon size={12} />
          <p>Aberto!</p>
        </div>
      </div>

      <ScrollArea className="w-full">
        <div className="flex w-max space-x-4 p-4 pt-0">
          {restaurant.menuCategories.map((category) => (
            <Button
              key={category.id}
              variant={getCategoryButtonVariant(category)}
              size="sm"
              className="rounded-full"
              onClick={() => handleCategorieClick(category)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <h3 className="px-5 pt-2 font-semibold">{selectedCategory.name}</h3>
      <Products products={selectedCategory.products}/>
          {products.length > 0 && (
            <div className="fixed bottom-0 left-0 right-0 flex w-full items-center justify-between border-t bg-white px-5 py-3">
              <div>
                <p className="text-sx text-muted-foreground">Total dos pedidos</p>
                <p className="text-sm font-semibold">
                  {formatCurrency(total)}
                  <span className="text-xs font-normal text-muted-foreground">
                    / {totalQuantity} {totalQuantity > 1 ? 'itens' : 'item'}
                  </span>
                </p>
              </div>
              <Button onClick={toggleCart}>Ver sacola</Button>
              <CartSheet/>  
            </div>
          )}
    </div>
  );
};

export default RestaurantCategories;
