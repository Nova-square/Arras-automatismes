import { TechnicalDoc } from '../types';
import { FileText, Download } from 'lucide-react';

interface DocumentCardProps {
  document: TechnicalDoc;
}

export default function DocumentCard({ document }: DocumentCardProps) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
      <div className="flex items-center">
        <FileText className="w-6 h-6 text-[#ff6600] mr-4" />
        <div>
          <h3 className="font-semibold text-[#003366] font-montserrat">
            {document.title}
          </h3>
          <p className="text-sm text-gray-500 font-open-sans">
            {document.type} • {document.size}
          </p>
        </div>
      </div>
      <a
        href={document.url}
        className="flex items-center text-[#ff6600] hover:text-[#e65c00] font-semibold"
      >
        <Download className="w-5 h-5 mr-2" />
        Télécharger
      </a>
    </div>
  );
}