
import React from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatIndianCurrency } from "@/utils/formatters";

type AgendaItem = {
  id: string;
  type: string;
  title: string;
  date: string;
  amount: number;
  percentage: string;
  status: string;
}

type AgendaAlertProps = {
  agendaItems: AgendaItem[];
  onViewNotice: (itemId: string) => void;
}

const AgendaAlert: React.FC<AgendaAlertProps> = ({ agendaItems, onViewNotice }) => {
  if (agendaItems.length === 0) {
    return null;
  }

  return (
    <div className="bg-red-950/30 border border-red-800/50 rounded-xl p-6 mb-6">
      <div className="flex items-start">
        <AlertCircle className="h-6 w-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
        <div className="w-full">
          <h2 className="text-lg font-bold text-red-400 mb-2">Pending Action Required</h2>
          {agendaItems.map((item) => (
            <div key={item.id} className="mb-4">
              <h3 className="text-md font-medium text-white">{item.title}</h3>
              <p className="text-sm text-[#B0B0B0] mb-2">
                Due Date: <span className="font-bold text-red-400">{item.date}</span>
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <p className="text-sm">
                  Amount: <span className="font-medium text-white">{formatIndianCurrency(item.amount)}</span> ({item.percentage} of total commitment)
                </p>
                <Button 
                  variant="outline"
                  size="sm"
                  className="border-red-800/50 text-red-400 hover:bg-red-950/50 sm:ml-auto"
                  onClick={() => onViewNotice(item.id)}
                >
                  View Notice
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgendaAlert;
