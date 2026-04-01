import { teas } from "./data/teas.js";
import { Order } from "./exercise2.js";
import { OrderItem } from "./exercise2.js";
import { Tea } from "./exercise1.js";

class Customer {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.orders = [];
  }

  placeOrder(order) {
    if (!(order instanceof Order)) {
      throw new Error("Must place a valid Order");
    }
    order.status = "confirmed";
    this.orders.push(order);
    return order;
  }

  totalSpent() {
    return this.orders.reduce((sum, order) => sum + order.getTotal(), 0);
  }

  getOrderHistory() {
    const header = `${this.name} (${this.email}) - ${this.orders.length} orders\n`;

    const ordersStr = this.orders
      .map((order, idx) => {
        const orderHeader = `Order ${idx + 1} (${order.status}) - ${order.items.length} item${order.items.length > 1 ? "s" : ""}`;
        const itemsStr = order.items
          .map((item) => `  ${item.describe()}`)
          .join("\n");
        const totalStr = `Total: ${order.getTotal().toFixed(2)} DKK`;
        return `${orderHeader}\n${itemsStr}\n${totalStr}`;
      })
      .join("\n\n");

    const lifetimeTotal = `\n\nLifetime total: ${this.totalSpent().toFixed(2)} DKK`;

    return header + "\n" + ordersStr + lifetimeTotal;
  }
}

// Test:
const teaInstances = teas.map(Tea.fromObject);
const customer = new Customer("Alex", "alex@example.com");

const order1 = new Order();
order1.addItem(new OrderItem(teaInstances[0], 100)); // Sencha
customer.placeOrder(order1);

const order2 = new Order();
order2.addItem(new OrderItem(teaInstances[7], 50)); // Matcha
customer.placeOrder(order2);

console.log(customer.getOrderHistory());
console.log("Total spent:", customer.totalSpent().toFixed(2), "DKK");
