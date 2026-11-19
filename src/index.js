window.loadData = (json) => {
  const data = JSON.parse(json);

    // Get table reference
    const tableele = document.getElementById("table");
    
    // Create table head
    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");
    ["Product", "Lot"].forEach(text => {
        const th = document.createElement("th");
        th.textContent = text;
        headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    tableele.appendChild(thead);
    
    // Create table foot
    const tfoot = document.createElement("tfoot");
    const footRow = document.createElement("tr");
    ["Product", "Lot"].forEach(text => {
        const th = document.createElement("th");
        th.textContent = text;
        footRow.appendChild(th);
    });
    tfoot.appendChild(footRow);
    tableele.appendChild(tfoot);
    
    // Create table body
    const tbody = document.createElement("tbody");
    tableele.appendChild(tbody);


    // Setup - add a text input to each footer cell
    $('#table tfoot th').each(function (i) {
      const title = $('#table thead th')
          .eq($(this).index())
          .text();
      $(this).html(
          '<input type="text" placeholder="' + title + '" data-index="' + i + '" />'
      );
      console.log(title);
  });


  let table = new DataTable("#table", {
    data: data,
    paging: false,
    fixedHeader: true,
    dom: 'lrt',
    scrollCollapse: true,
    scrollY: "80vh",
    fixedColumns: true,
    order: [[0, 'asc'],[1, 'asc']],
    columns: [
      {
        data: "fieldData.Product",
        title: "Product",
      },
      {
        data: "fieldData.LotNumber",
        title: "Lot",
      },
      {
        data: "fieldData._ID",
        title: "_ID",
        visible: false
      }
    ],
  });

    // Filter event handler
    $(table.table().container()).on('keyup', 'tfoot input', function () {
      table
          .column($(this).data('index'))
          .search(this.value)
          .draw();
  });

  table.on("click", "tbody tr", function (e) {
    const rowData = table.row(this).data(); // Get full row data
    if (rowData) {
        const selectedData = {
          mode: "selectLot",
            Product: rowData.fieldData.Product,
            Lot: rowData.fieldData.LotNumber,
            _ID: rowData.fieldData._ID, // Include hidden column data
            ProductId: rowData.fieldData.Product_ID // Include hidden column data
        };
        FileMaker.PerformScript("Manage: Inventory", JSON.stringify(selectedData));
    }
});

};
