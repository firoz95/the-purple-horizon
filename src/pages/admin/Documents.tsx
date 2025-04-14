
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Download, Eye, Trash2 } from "lucide-react";

// Placeholder data for documents
const documentsData = [
  { id: "1", name: "Fund PPM", category: "PPM", uploadedAt: "2025-02-15", visibility: "All Investors", fileUrl: "#" },
  { id: "2", name: "Q1 2025 NAV Statement", category: "NAV Statement", uploadedAt: "2025-04-10", visibility: "All Investors", fileUrl: "#" },
  { id: "3", name: "Series C Drawdown Notice", category: "Drawdown Notice", uploadedAt: "2025-03-21", visibility: "Selected Investors", fileUrl: "#" },
  { id: "4", name: "Co-Investment Opportunity: TechX", category: "Co-Investment", uploadedAt: "2025-03-05", visibility: "Selected Investors", fileUrl: "#" },
  { id: "5", name: "Annual General Meeting Minutes", category: "General", uploadedAt: "2025-01-20", visibility: "All Investors", fileUrl: "#" },
];

const DocumentsPage = () => {
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [documentName, setDocumentName] = useState("");
  const [category, setCategory] = useState("");
  const [visibility, setVisibility] = useState("all");
  const [uploading, setUploading] = useState(false);
  
  const [documents, setDocuments] = useState(documentsData);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFile(e.target.files[0]);
      if (!documentName) {
        setDocumentName(e.target.files[0].name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!uploadFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }
    
    setUploading(true);
    
    try {
      // Simulate file upload to Supabase storage
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real implementation, this would upload to Supabase storage
      // and add a record to the documents table
      
      const newDocument = {
        id: (documents.length + 1).toString(),
        name: documentName,
        category,
        uploadedAt: new Date().toISOString().split("T")[0],
        visibility: visibility === "all" ? "All Investors" : "Selected Investors",
        fileUrl: "#",
      };
      
      setDocuments([newDocument, ...documents]);
      
      // Reset form
      setUploadFile(null);
      setDocumentName("");
      setCategory("");
      setVisibility("all");
      
      toast({
        title: "Document uploaded",
        description: "Document has been successfully uploaded",
      });
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };
  
  const handleDelete = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    toast({
      title: "Document deleted",
      description: "Document has been removed",
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#222222] mb-6">Document Management</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upload Document</CardTitle>
            <CardDescription>
              Upload documents to share with investors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file">File</Label>
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">Document Name</Label>
                <Input
                  id="name"
                  value={documentName}
                  onChange={(e) => setDocumentName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PPM">PPM</SelectItem>
                    <SelectItem value="NAV Statement">NAV Statement</SelectItem>
                    <SelectItem value="Contribution Agreement">Contribution Agreement</SelectItem>
                    <SelectItem value="Side Letter">Side Letter</SelectItem>
                    <SelectItem value="Unit Statement">Unit Statement</SelectItem>
                    <SelectItem value="Drawdown Notice">Drawdown Notice</SelectItem>
                    <SelectItem value="Co-Investment">Co-Investment</SelectItem>
                    <SelectItem value="General">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="visibility">Visibility</Label>
                <Select value={visibility} onValueChange={setVisibility}>
                  <SelectTrigger id="visibility">
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Investors</SelectItem>
                    <SelectItem value="selected">Selected Investors</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {visibility === "selected" && (
                <div className="space-y-2">
                  <Label htmlFor="investors">Select Investors</Label>
                  <Select>
                    <SelectTrigger id="investors">
                      <SelectValue placeholder="Select investors" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="investor1">Rajesh Investments Ltd</SelectItem>
                      <SelectItem value="investor2">Priya Capital Partners</SelectItem>
                      <SelectItem value="investor3">Kumar Holdings</SelectItem>
                      <SelectItem value="investor4">Sharma Ventures</SelectItem>
                      <SelectItem value="investor5">Patel Enterprises</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-[#808080]">
                    You can select multiple investors
                  </p>
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full bg-[#4B2E83] hover:bg-[#3a2266]"
                disabled={uploading || !uploadFile}
              >
                {uploading ? "Uploading..." : "Upload Document"}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Uploads</CardTitle>
            <CardDescription>Recently uploaded documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-h-[400px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Uploaded</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.slice(0, 5).map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-[#4B2E83]" />
                        <span className="font-medium">{doc.name}</span>
                      </TableCell>
                      <TableCell>{doc.category}</TableCell>
                      <TableCell>{doc.uploadedAt}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="outline" size="icon">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>All Documents</CardTitle>
          <CardDescription>Manage all uploaded documents</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Uploaded Date</TableHead>
                <TableHead>Visibility</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-[#4B2E83]" />
                    <span className="font-medium">{doc.name}</span>
                  </TableCell>
                  <TableCell>{doc.category}</TableCell>
                  <TableCell>{doc.uploadedAt}</TableCell>
                  <TableCell>{doc.visibility}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleDelete(doc.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentsPage;
