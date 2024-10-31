import SectionTitle from "@/components/global/SectionTitle";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { fetchUsersOrders } from "@/utils/actions";
import { formatDate, formatCurrency } from "@/utils/format";

async function OrdersPage() {
  const orders = await fetchUsersOrders();

  return (
    <>
      <SectionTitle text="your orders" />
      <div>
        <Table>
          <TableCaption>Total Orders:{orders.length}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>OrderId</TableHead> <TableHead>Products</TableHead>
              <TableHead>Order Total</TableHead>
              <TableHead>Tax</TableHead> <TableHead>Shipping</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => {
              const { id, products, orderTotal, tax, shipping, createdAt } =
                order;
              return (
                <TableRow key={id}>
                  <TableCell>
                    {id.slice(id.length - 9, id.length - 1)}
                  </TableCell>
                  <TableCell>{products}</TableCell>
                  <TableCell>{formatCurrency(orderTotal)}</TableCell>
                  <TableCell>{formatCurrency(tax)}</TableCell>
                  <TableCell>{formatCurrency(shipping)}</TableCell>
                  <TableCell>{formatDate(createdAt)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default OrdersPage;
