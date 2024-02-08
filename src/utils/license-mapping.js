export const keyMapping = {
    "DAA": "full_name",
    "DAB": "last_name",
    "DAC": "first_name",
    "DAD": "middle_name",
    "DAE": "name_suffix",
    "DAF": "name_prefix",
    "DAG": "address_1",
    "DAH": "address_2",
    "DAI": "city",
    "DAJ": "state",
    "DAK": "postal_code",
    "DAL": "address_1",
    "DAM": "address_2",
    "DAN": "city",
    "DAO": "state",
    "DAP": "postal_code",
    "DBB": "dob",
    "DBC": "gender",
    "DCG": "country",
    "DCS": "last_name",
    "DCT": "first_name",
    "DAQ":"License or ID Number",
    "DAR":"License Classification Code",
    "DAS":"License Restriction Code",
    "DAT":"License Endorsements Code",
    "DAU":"Height in FT_IN",
    "DAV":"Height in CM",
    "DAW":"Weight in LBS",
    "DAX":"Weight in KG",
    "DAY":"Eye Color",
    "DAZ":"Hair Color",
    "DBA":"License Expiration Date",
    "DBD":"License or ID Document Issue Date",
    "DBE":"Issue Timestamp",
    "DBF":"Number of Duplicates",
    "DBG":"Medical Indicator Codes",
    "DBH":"Organ Donor",
    "DBI":"Non-Resident Indicator",
    "DBJ":"Unique Customer Identifier",
    "DBK":"Social Security Number",
    "DBL":"Date Of Birth",
    "DBM":"Social Security Number",
    "DBN":"Full Name",
    "DBO":"Family Name",
    "DBP":"Given Name",
    "DBQ":"Middle Name or Initial",
    "DBR":"Suffix",
    "DBS":"Prefix",
    "DCA":"Vehicle Class",
    "DCB":"Restrictions",
    "DCD":"Specific Endorsements",
    "DCE":"Physical Description Weight Range",
    "DCF":"Document Discriminator",
    "DCH":"Federal Commercial Vehicle Codes",
    "DCI":"Place of birth",
    "DCJ":"Audit information",
    "DCK":"Inventory Control Number",
    "DCL":"Race Ethnicity",
    "DCM":"Standard vehicle classification",
    "DCN":"Standard endorsement code",
    "DCO":"Standard restriction code",
    "DCP":"Jurisdiction specific vehicle classification description",
    "DCQ":"Jurisdiction-specific",
    "DCR":"Jurisdiction specific restriction code description",
    "DCU":"Suffix",
    "DDA":"Compliance Type",
    "DDB":"Card Revision Date",
    "DDC":"HazMat Endorsement Expiry Date",
    "DDD":"Limited Duration Document Indicator",
    "DDE":"Family Name Truncation",
    "DDF":"First Names Truncation",
    "DDG":"Middle Names Truncation",
    "DDH":"Under 18 Until",
    "DDI":"Under 19 Until",
    "DDJ":"Under 21 Until",
    "DDK":"Organ Donor Indicator",
    "DDL":"Veteran Indicator",
    "PAA":"Permit Classification Code",
    "PAB":"Permit Expiration Date",
    "PAC":"Permit Identifier",
    "PAD":"Permit IssueDate",
    "PAE":"Permit Restriction Code",
    "PAF":"Permit Endorsement Code",
    "ZVA":"Court Restriction Code"
}


export function parseData (rawData) {
    const lines = rawData.split('\n');
    const parsedData = {};
  
    lines.forEach((line) => {
      const key = line.substring(0, 3).trim();
      const value = line.substring(3).trim();
  
      if (key && value && keyMapping[key]) {
        const fieldName = keyMapping[key];
        parsedData[fieldName] = value;
      }
    });
  
    return parsedData;
};