const express = require('express');
var jsforce = require('jsforce');
const cors = require('cors');
const app = express();


app.use(express.urlencoded())
app.use(express.json())
app.use(cors());



var conn = new jsforce.Connection({
  instanceUrl : 'https://soljit35-dev-ed.my.salesforce.com',
  accessToken : '00D4L000000gmbH!AQsAQHVX5kp3B4PFOtvv9ftl1OquuijSOlQevfpUhx7zY_rbx1nJ0pBWXCsEwSg6ZNmy28Zh.9i.0vd6nPqd_GKEZf8nR1by'
});


app.get('/Fetch', function(req, res) {
    conn.sobject("Candidature__c")
    .select('*') // asterisk means all fields in specified level are targeted. 
    .where("Id = 'a004L000002gCJK' ") // synonym of "skip"
    .execute(function(err, records) {
      if (err) { return console.error(err); }   
      for (var i=0; i<records.length; i++) {       
        var record = records[i];    
        console.log("First Name: " + record.First_Name__c);
        console.log("Last Name: " + record.Last_Name__c);
        console.log("Year : " + record.Year__c); 
        console.log("Experience : " + record.Year_Of_Experience__c);     
        if (record.Cases) {
          console.log("Cases total: " + record.Cases.totalSize);
          console.log("Cases fetched: " + record.Cases.records.length);
        }
      }
    });
  
});

app.get('/FetchAll', (req, res) => {
    conn.query('SELECT Id, First_Name__c, Last_Name__c, Year__c, Year_Of_Experience__c FROM Candidature__c', (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        console.log("succes");
        res.send(result.records);
       
      }
    });
  });
app.post('/create', function(req, res)  {
   
      const Candidature = {
        First_Name__c: req.body.Fname,
        Last_Name__c: req.body.Lname,
        Year_Of_Experience__c: req.body.Exp     
      };
      console.log(Candidature);
      const result = conn.sobject('Candidature__c').create(Candidature);
      //const createdRecord =  conn.sobject('Candidature__c').retrieve(result.id);
      res.json(result);
      console.log(result);
    
  });


  app.put('/update/:id', function(req, res) {
    try {
      
  
        const Candidature = {
            First_Name__c: req.body.Fname,
            Last_Name__c: req.body.Lname,
            Year_Of_Experience__c: req.body.Exp     
          };
  
      const result = conn.sobject('Candidature__c').update(Candidature);
  
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });


  app.get('/search/:query', (req, res) => {
    const query = req.params.query;
    console.log(query);
    const fields = ['id','First_Name__c', 'Last_Name__c', 'Year__c'];
    const searchQuery = `FIND {${query}} IN ALL FIELDS RETURNING Candidature__c(${fields.join()})`;
    conn.search(searchQuery, (err, result) => {
      if (err) {
        return console.error(err);
      }
      const records = result;
      console.log(records);
      res.json(result);
    });
  });












app.listen(3000, function() {
  console.log('Server started on port 3000');
});