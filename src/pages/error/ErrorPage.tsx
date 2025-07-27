import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Container from "@/components/ui/container";
import { AlertCircle } from "lucide-react";
import React, { use } from "react";
import { useNavigate } from "react-router";

const ErrorPage = () => {
    const navigate = useNavigate();
  return (
    <Container className="flex items-center justify-center">
      <Card className="w-fit">
        <CardTitle className="text-red-500 text-2xl">Error 404: Page Not Found</CardTitle>
        <CardContent>
          <CardDescription className="flex flex-row flex-nowrap gap-2 items-center">
            <AlertCircle/>The page you are looking for does not exist or has been moved.
          </CardDescription>
          <Button variant="outline" className="mt-4 " onClick={() => navigate('/dashboard')}>
            Go Back
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ErrorPage;
