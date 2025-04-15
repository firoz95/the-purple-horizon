
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Download, FileText } from "lucide-react";

type Document = {
  id: string;
  name: string;
  category: string;
  uploaded: string;
  downloadable: boolean;
  fileUrl: string;
  dueDate?: string;
  percentage?: string;
}

type DocumentsSectionProps = {
  documents: Document[];
}

const DocumentsSection: React.FC<DocumentsSectionProps> = ({ documents }) => {
  const categories = ["PPM", "Contribution Agreement", "Side Letter", "Unit Statement", "Contribution Notices"];
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const filteredDocuments = activeFilter 
    ? documents.filter(doc => doc.category === activeFilter)
    : documents;

  return (
    <section id="documents" className="scroll-mt-20">
      <Card className="bg-card text-white border-[#222222] rounded-xl shadow-dashboard">
        <CardHeader>
          <CardTitle>Documents</CardTitle>
          <CardDescription className="text-[#B0B0B0]">Access your fund documents</CardDescription>
          
          <div className="flex flex-wrap gap-2 mt-2">
            <Button
              variant={activeFilter === null ? "default" : "outline"}
              size="sm"
              className={activeFilter === null 
                ? "bg-[#4B2E83] hover:bg-[#3a2266]" 
                : "border-[#333333] text-white hover:bg-[#222222]"
              }
              onClick={() => setActiveFilter(null)}
            >
              All
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={activeFilter === category ? "default" : "outline"}
                size="sm"
                className={activeFilter === category 
                  ? "bg-[#4B2E83] hover:bg-[#3a2266]" 
                  : "border-[#333333] text-white hover:bg-[#222222]"
                }
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDocuments.length === 0 ? (
              <p className="text-[#B0B0B0] italic">No documents available</p>
            ) : (
              filteredDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 bg-[#222222] rounded-lg">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-[#4B2E83] mr-3" />
                    <div>
                      <p className="font-medium text-white">{doc.name}</p>
                      <p className="text-xs text-[#B0B0B0]">
                        {doc.category} • Uploaded: {doc.uploaded}
                      </p>
                      
                      {doc.category === "Contribution Notices" && doc.dueDate && (
                        <p className="text-xs mt-1">
                          <span className="text-[#B0B0B0]">Due Date: </span>
                          <span className="font-bold text-red-400">{doc.dueDate}</span>
                          {doc.percentage && ` (${doc.percentage})`}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center border-[#333333] text-white hover:bg-[#333333]"
                    >
                      <Eye className="h-3.5 w-3.5 mr-1.5" />
                      View
                    </Button>
                    
                    {doc.downloadable && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex items-center border-[#333333] text-white hover:bg-[#333333]"
                      >
                        <Download className="h-3.5 w-3.5 mr-1.5" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default DocumentsSection;
