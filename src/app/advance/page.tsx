import Advance from "@/components/Advance";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcnui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advance | Age Calculator",
  description: "Advance page of Age Calculator",
};

const page = () => {
  return (
    <section className="grid h-dvh place-items-center">
      <Card className="min-w-xs">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Advance Age Calculator
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Advance />
        </CardContent>
      </Card>
    </section>
  );
};

export default page;
