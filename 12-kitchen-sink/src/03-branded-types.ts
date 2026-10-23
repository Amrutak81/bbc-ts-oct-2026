// Branded Types

type Brand<T, B> = T & { __brand: B };

type UserId = Brand<string, "UserId">;
type ProductId = Brand<string, "ProductId">;

const userId: UserId = "kevin" as UserId;
const productId: ProductId = "iPod" as ProductId;

function lookupProduct(productId: ProductId) {
  return productId;
}

lookupProduct(productId);
lookupProduct(userId);

type Meters = Brand<number, "Meters">;
type Seconds = Brand<number, "Seconds">;

function createMeters(value: number): Meters {
  return value as Meters;
}
function createSeconds(value: number): Seconds {
  return value as Seconds;
}
function calculateSpeed(distance: Meters, time: Seconds): number {
  return distance / time;
}

const distance = createMeters(100);
const time = createSeconds(10);

calculateSpeed(distance, time);
