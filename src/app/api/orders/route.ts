import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Path to our local JSON database
    const filePath = path.join(process.cwd(), 'src', 'data', 'orders.json');
    
    // Read existing orders
    let orders = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      if (fileData) {
        try {
          orders = JSON.parse(fileData);
        } catch (e) {
          console.error("Error parsing orders.json", e);
        }
      }
    }

    // Create new order record
    const newOrder = {
      id: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      status: 'pending',
      ...body
    };

    // Add to array and save
    orders.push(newOrder);
    fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));

    // Simulate network delay for a more premium feel
    await new Promise(resolve => setTimeout(resolve, 1500));

    return NextResponse.json({ success: true, orderId: newOrder.id });
    
  } catch (error) {
    console.error("Order processing error:", error);
    return NextResponse.json(
      { error: 'Failed to process configuration order' },
      { status: 500 }
    );
  }
}
