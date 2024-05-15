export interface Delivery {
  deliveryId: string,
  orders: string[],
  customer: string,
  customerAddress: string,
  coordinates: [number, number],
  status?: 'PLANNED' | 'IN_COURSE' | 'UNLOADING' | 'WITH_CUSTOMER' | 'ASSEMBLY' | 'COMPLETED'
}
