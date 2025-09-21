import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { Companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const navigate = useNavigate();
  const [filterCompany, setFilterCompany] = useState(Companies);

  useEffect(() => {
    const filteredCompany =
      Companies.length >= 0 &&
      Companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [Companies, searchCompanyByText]);

  return (
    <div className="p-4 bg-white border border-gray-200 shadow-md rounded-2xl">
      <Table>
        <TableCaption className="text-sm italic text-gray-500">
          Recently registered companies
        </TableCaption>
        <TableHeader>
          <TableRow className="transition-colors bg-gray-100 hover:bg-gray-200">
            <TableHead className="font-semibold">Logo</TableHead>
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="font-semibold text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany.length <= 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="py-6 italic text-center text-gray-500"
              >
                You haven’t registered any company yet.
              </TableCell>
            </TableRow>
          ) : (
            <>
              {filterCompany?.map((company, index) => (
                <TableRow
                  key={index}
                  className="transition-colors hover:bg-gray-50"
                >
                  <TableCell>
                    <Avatar className="border border-gray-300">
                      <AvatarImage
                        src={company.logo || "https://via.placeholder.com/40"}
                      />
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium text-gray-800">
                    {company.name}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {company.createdAt
                      ? company.createdAt.split("T")[0]
                      : "N/A"}
                  </TableCell>
                  <TableCell className="text-right cursor-pointer">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="p-2 transition rounded-full hover:bg-gray-100">
                          <MoreHorizontal />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="p-2 shadow-lg w-36 rounded-xl">
                        <div
                          className="flex items-center gap-2 p-2 transition rounded-lg cursor-pointer hover:bg-gray-100"
                          onClick={() =>
                            navigate(`/admin/companies/${company._id}`)
                          }
                        >
                          <Edit2 size={16} className="text-blue-600" />
                          <span className="text-sm">Edit</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
