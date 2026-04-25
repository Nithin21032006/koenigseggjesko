import { CAR_MODELS } from "@/data/cars";

export function generateStaticParams() {
  return CAR_MODELS.map((car) => ({
    carId: car.id,
  }));
}

export default function ConfiguratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
