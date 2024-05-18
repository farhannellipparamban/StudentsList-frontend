import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { addStudent, deleteStudent, getAllStudents } from "../../api/adminApi";
import AddStudent from "./AddStudent";
import EditStudent from "./EditStudents";

interface Student {
  _id?: string;
  name?: string;
  email?: string;
  mobile?: string;
  enrollNo?: string;
  doAdmission?: string;
}

const StudenstList: React.FC = () => {
  const [studentList, setStudentList] = useState<Student[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [newStudent, setNewStudent] = useState<Student>({
    name: "",
    email: "",
    mobile: "",
    enrollNo: "",
    doAdmission: "",
  });

  const getStudents = async () => {
    try {
      const response = await getAllStudents();
      if (response && response.data && Array.isArray(response.data)) {
        setStudentList(response.data);
      } else {
        console.error("Unexpected data format from API:", response);
        setStudentList([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  const handleEdit = (student: Student) => {
    setEditStudent(student);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteStudent(id);
      setStudentList((prevStudents) =>
        prevStudents.filter((student) => student._id !== id)
      );
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = (date as any).toLocaleDateString("en-US", options);
    const [month, day, Year] = formattedDate.split(" ");
    return `${day.replace(",", "")}-${month}, ${Year}`;
  }

  return (
    <div className="container mx-auto px-1 sm:px-2">
      <div className="flex justify-between items-center my-3">
        <h1 className="font-bold text-3xl">Students</h1>
        <div className="flex items-center space-x-5">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-2 pr-28 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out transform hover:scale-105 placeholder-gray-500"
          />

          <button
            onClick={() => {
              setEditStudent(null);
              setShowModal(true);
            }}
            className="px-3 py-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            ADD NEW STUDENT
          </button>
          {showModal &&
            (editStudent ? (
              <EditStudent
                showModal={showModal}
                setShowModal={setShowModal}
                student={editStudent}
                updateStudentList={getStudents}
              />
            ) : (
              <AddStudent
                showModal={showModal}
                setShowModal={setShowModal}
                newStudent={newStudent}
                setNewStudent={setNewStudent}
                addStudent={addStudent}
                updateStudentList={getStudents}
              />
            ))}
        </div>
      </div>
      <div className="py-8">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow-lg overflow-hidden border border-gray-400 sm:rounded-xl">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        NAME
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        EMAIL
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        PHONE
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        ENROLL NUMBER
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        DATE OF ADMISSION
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      ></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {studentList &&
                    Array.isArray(studentList) &&
                    studentList.length > 0 ? (
                      studentList.map((student) => (
                        <tr
                          key={student._id}
                          className="hover:bg-gray-100 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center text-sm text-black">
                              <img
                                src="/download (1).png"
                                alt=""
                                className="rounded-full w-8 h-8 mr-2"
                              />
                              <span className="font-semibold">
                                {student.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-black">
                              {student.email}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-black">
                              {student.mobile}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-black">
                              {student.enrollNo}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-black">
                              {formatDate(student.doAdmission as string)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex gap-2">
                              <FontAwesomeIcon
                                icon={faEdit}
                                onClick={() => handleEdit(student)}
                                className="text-blue-600 cursor-pointer"
                              />
                              <FontAwesomeIcon
                                icon={faTrashAlt}
                                onClick={() => handleDelete(student._id!)}
                                className="text-red-500 cursor-pointer"
                              />
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center">
                          No students found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudenstList;

import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-green-400 border-b border-gray-200 w-full pb-5">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              id="toggleSidebarMobile"
              aria-expanded="true"
              aria-controls="sidebar"
              className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
            >
              <svg
                id="toggleSidebarMobileHamburger"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                id="toggleSidebarMobileClose"
                className="w-6 h-6 hidden"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <span className="self-center whitespace-nowrap text-white font-bold font-sans text-center align-middle justify-center mx-3 mt-3">
              Students
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


import React from "react";

const Sidebar: React.FC = () => {
  return (
    <div className="bg-purple-700 text-gray-100 flex flex-col justify-between w-1/5 py-4 px-3">
      <div>
        <div className="flex items-center justify-start mt-5">
          <img
            src="/download.png"
            alt="Profile"
            className="w-12 h-12 rounded-full mr-2"
          />
          <div>
            <h1 className="text-xl font-semibold">Yellow Owl</h1>
            <span className="ml-1 font-thin">Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
