import { AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const NoDisastersFound = () => {
  return (
    <Card>
      <CardContent className="py-8 text-center">
        <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">
          No disasters found
        </h3>
        <p className="text-gray-500">
          Try adjusting your filters or search terms.
        </p>
      </CardContent>
    </Card>
  );
};

export default NoDisastersFound;