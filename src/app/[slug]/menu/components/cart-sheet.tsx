import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext } from "../context/cart";
import CartProductItem from "./cart-product-item";
import FinishOrderDialog from "./finish-order-dialog";

const CartSheet = ({}) => {
    const {isOpen, toggleCart, products, total} = useContext(CartContext)
    const [finishCartDialogIsOpen, setFinishCartDialogIsOpen] = useState(false)
    return ( 
        <Sheet open={isOpen} onOpenChange={toggleCart}>
                <SheetContent className="w-[80%]">
                    <SheetHeader>
                    <SheetTitle className="text-left">Sacola</SheetTitle>
                    
                    </SheetHeader>
                    <div className="py-5 flex h-full flex-col">
                        <div className="flex-auto">
                            {products.map(product => (
                                <CartProductItem key={product.id} product={product}/>
                            ))}
                        </div>
                        <Card className="mb-6">
                            <CardContent
                                className="p-5"
                            >
                                <div className="flex justify-between">
                                    <p className="text-sm text-muted-foreground">Total</p>
                                    <p className="font-semibold text-sm">{formatCurrency(total)}</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Button className="w-full rounded-full" onClick={() => setFinishCartDialogIsOpen(true)}>
                            Finalizar pedido
                        </Button>
                        <FinishOrderDialog open={finishCartDialogIsOpen} onOpenChange={setFinishCartDialogIsOpen} />
                    </div>
                </SheetContent>
                </Sheet>
     );
}
 
export default CartSheet;