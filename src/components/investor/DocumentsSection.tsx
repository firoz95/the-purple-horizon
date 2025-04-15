
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
      <Card className="rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <CardHeader className="bg-white border-b border-gray-100">
          <CardTitle className="text-xl text-gray-800">Documents</CardTitle>
          <CardDescription className="text-gray-500">Access your fund documents</CardDescription>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <Button
              variant={activeFilter === null ? "default" : "outline"}
              size="sm"
              className={activeFilter === null 
                ? "" 
                : "border-gray-200 text-gray-700 hover:bg-gray-50"
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
                  ? "" 
                  : "border-gray-200 text-gray-700 hover:bg-gray-50"
                }
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="p-6 bg-white">
          <div className="space-y-4">
            {filteredDocuments.length === 0 ? (
              <p className="text-gray-500 italic">No documents available</p>
            ) : (
              filteredDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-primary/10 p-2 rounded-full mr-3">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{doc.name}</p>
                      <p className="text-xs text-gray-500">
                        {doc.category} • Uploaded: {doc.uploaded}
                      </p>
                      
                      {doc.category === "Contribution Notices" && doc.dueDate && (
                        <p className="text-xs mt-1">
                          <span className="text-gray-600">Due Date: </span>
                          <span className="font-bold text-red-600">{doc.dueDate}</span>
                          {doc.percentage && ` (${doc.percentage})`}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center border-gray-200 text-gray-700 hover:bg-gray-100"
                    >
                      <Eye className="h-3.5 w-3.5 mr-1.5" />
                      View
                    </Button>
                    
                    {doc.downloadable && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex items-center border-gray-200 text-gray-700 hover:bg-gray-100"
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
