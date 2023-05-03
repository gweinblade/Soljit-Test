function Fetch() {
    $(document).ready(() => {
        $.ajax({
        url: 'http://localhost:3000/FetchAll',
        method: 'GET',

        success: (data) => {
        const employeeData = $('#employee-data');

        data.forEach((candidature) => {
            const row = $('<tr></tr>');

            $('<td></td>').text(candidature.First_Name__c).appendTo(row);
            $('<td></td>').text(candidature.Last_Name__c).appendTo(row);
            $('<td></td>').text(candidature.Year__c).appendTo(row);
            $('<td></td>').text(candidature.Year_Of_Experience__c).appendTo(row);

            employeeData.append(row);
        });
        },
        error: (err) => {
        console.error(err);
        }
        });
        });
    }

function Upadte() {
    $(document).ready(function() {
        $('#update-form').submit(function(event) {
          event.preventDefault();
          var First_Name__c = $('#First_Name__c').val();
          var  Last_Name__c = $('#Last_Name__c').val();
          var experience = $('#experience').val();
          var id = $('#id').val();
      
          $.ajax({
            type: 'PUT',
            url: 'http://localhost:3000/update/'+ id,
            data: JSON.stringify({First_Name__c: First_Name__c, Last_Name__c: Last_Name__c, experience: experience}),
            contentType: 'application/json',
            success: function(response) {
              console.log('Product updated successfully');
            },
            error: function(error) {
              console.log(error);
            }
          });
        });
      });
}
function Search() {
    $(document).ready(() => {
       
          const query = $('#searchInput').val();
          $.ajax({
            url: `http://localhost:3000/search/${query}`,
            type: 'GET',
            dataType: 'json',
            success: (data) => {
              $('#resultsTable tbody').empty();
              console.log(data[1]);

              //const arr = [...data];
              arr.forEach(element => {
                // bobby
                // hadz
                // com
                console.log(element);
              });
             /* Array.from(data).forEach((record) => {
                $('#resultsTable tbody').append(`
                  <tr>
                    <td>${record[1].First_Name__c}</td>
                    <td>${record[1].Last_Name__c}</td>
                    
                  </tr>
                `);
              });*/
            },
            error: (xhr, status, error) => {
              console.error(error);
            }
          
        });
      });
}