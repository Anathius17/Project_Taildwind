import React, { useState, useEffect } from "react";

const ModalLogScheduler = ({ isOpen, onClose, currenScheduler, reload }) => {
  const [log, setScheduler] = useState(currenScheduler);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setScheduler(currenScheduler);
  }, [currenScheduler]);

  // Menghitung indeks item pertama dan item terakhir
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Mengambil data yang sesuai dengan halaman saat ini dan term pencarian
  const filteredData = log.filter((item) =>
    item.p_job_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Menghitung jumlah total halaman
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Mengubah halaman saat tombol halaman diklik
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Mengubah jumlah item per halaman saat pilihan entri data berubah
  const handleEntriesChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Mengatur halaman kembali ke halaman pertama
  };

  // Mengubah term pencarian saat input pencarian berubah
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Mengatur halaman kembali ke halaman pertama saat melakukan pencarian baru
  };

  // close page
  const refresh = () => window.location.reload(true);

  const closepage = (e) => {
    e.preventDefault();
    refresh();
  };

  if (!isOpen) return null;
  return (
    <div class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute bg-white p-6 rounded-lg shadow-lg ">
        <div className="modal-main">
          <div className="modal-header">
            <h5 className="modal-title">Batch Schedule | Log</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <form>
              <div className="datatable-wrapper datatable-loading no-footer sortable searchable fixed-columns">
                <div className="datatable-top mb-3 d-flex justify-content-between">
                  <div className="page-item">
                    <span>Show entries:</span>
                    <select
                      value={itemsPerPage}
                      onChange={handleEntriesChange}
                      className="form-control">
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                    </select>
                  </div>

                  <div className="page-iittem">
                    <input
                      type="text"
                      placeholder="Search by Job Name"
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="form-control"
                    />
                  </div>

                  {/* <input type="number" /> */}
                </div>
                <div className="datatable-container">
                  <table className="min-w-max w-full width={100}  table-bordered">
                    <thead>
                      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-center">Job Name</th>
                        <th className="py-3 px-6 text-center">Status</th>
                        <th className="py-3 px-6 text-center">Date</th>
                        <th className="py-3 px-6 text-center">Hour</th>
                        <th className="py-3 px-6 text-center">Minute</th>
                        <th className="py-3 px-6 text-center">Start Date</th>
                        <th className="py-3 px-6 text-center">End Date</th>
                        <th className="py-3 px-6 text-center">Type</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light border-b">
                      {currentItems.map((log) => (
                        <tr className=" transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 white:hover:bg-neutral-600">
                          <td className="py-3 px-6 text-left whitespace-nowrap font-semibold">
                            {log.p_job_name}
                          </td>
                          <td className="py-3 px-6 text-left  whitespace-nowrap font-semibold">
                            {log.p_status}
                          </td>
                          <td className="py-3 px-6 text-left whitespace-nowrap font-semibold">
                            {log.p_date}
                          </td>
                          <td className="py-3 px-6 text-center whitespace-nowrap font-semibold">
                            {log.p_hour}
                          </td>
                          <td className="py-3 px-6 text-center whitespace-nowrap font-semibold">
                            {log.p_minute}
                          </td>
                          <td className="py-3 px-6 text-center whitespace-nowrap font-semibold">
                            {log.p_start_date}
                          </td>
                          <td className="py-3 px-6 text-center whitespace-nowrap font-semibold">
                            {log.p_end_date}
                          </td>
                          <td className="py-3 px-6 text-center whitespace-nowrap font-semibold">
                            {log.p_type}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={onClose}>
                      Close
                    </button>
                  </div>
                  {/* Pagination */}
                  <nav className="mt-2">
                    <div className="pagination-item d-flex justify-content-between">
                      <div className="page-1"></div>
                      <div className="page-2">
                        <nav aria-label="Page navigation example">
                          <ul class="inline-flex -space-x-px">
                            <li>
                              <button
                                className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                onClick={() =>
                                  handlePageChange(currentPage - 1)
                                }
                                disabled={currentPage === 1}>
                                Previous
                              </button>
                            </li>
                            <li>
                              {Array.from(
                                { length: totalPages },
                                (_, index) => index + 1
                              ).map((pageNumber) => (
                                <button
                                  className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                  key={pageNumber}
                                  onClick={() => handlePageChange(pageNumber)}
                                  disabled={pageNumber === currentPage}>
                                  {pageNumber}
                                </button>
                              ))}
                            </li>
                            <li>
                              <button
                                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                onClick={() =>
                                  handlePageChange(currentPage + 1)
                                }
                                disabled={currentPage === totalPages}>
                                Next
                              </button>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalLogScheduler;
