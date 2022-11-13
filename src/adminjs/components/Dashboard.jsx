import React, { useRef, useState } from "react";
import {
  Box,
  Header,
  Illustration,
  Input,
  Button,
  Loader,
  Text,
} from "@adminjs/design-system";
import readXlsxFile from "read-excel-file";
import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:3001";

const excelSchema = {
  ML: {
    prop: "ml",
    type: String,
  },
  PKT_SKP: {
    prop: "pktSkp",
    type: String,
  },
  DOST: {
    prop: "dost",
    type: String,
  },
  NAZWISKO: {
    prop: "surname",
    type: String,
  },
  DATA: {
    prop: "date",
    type: Date,
  },
  TLUSZCZ: {
    prop: "fat",
    type: String,
  },
  BIALKO: {
    prop: "protein",
    type: String,
  },
  LAKTOZA: {
    prop: "lactose",
    type: String,
  },
  SMB: {
    prop: "smb",
    type: String,
  },
  LKS: {
    prop: "lks",
    type: String,
  },
  OLD: {
    prop: "old",
    type: String,
  },
  PZAM: {
    prop: "pzam",
    type: String,
  },
  WODA: {
    prop: "water",
    type: String,
  },
  SH: {
    prop: "sh",
    type: String,
  },
  MOCZNIK: {
    prop: "urea",
    type: String,
  },
  KOD: {
    prop: "code",
    type: String,
  },
  TRASA: {
    prop: "route",
    type: String,
  },
  KURS: {
    prop: "course",
    type: String,
  },
  DATAPOB: {
    prop: "datapob",
    type: String,
  },
};

const Dashboard = () => {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    success: null,
    error: null,
  });

  const onUpload = async () => {
    try {
      setLoading(true);

      const { rows } = await readXlsxFile(fileInputRef.current.files?.[0], {
        schema: excelSchema,
      });

      const res = await axios.post(`${API_URL}/data`, rows);

      if (res.status === 200) {
        fileInputRef.current.value = null;
        setLoading(false);
        setMessage({
          error: false,
          success: true,
        });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setMessage({
        error: true,
        success: false,
      });
    }
  };

  return (
    <center>
      <Box variant="grey">
        <Box variant="card">
          <Illustration variant="Folders" />
          <Header.H4 fontWeight="bold">Wgraj plik z danymi</Header.H4>
          <Input type={"file"} ref={fileInputRef} accept=".xlsx, .xls" />
          <Button onClick={onUpload}>Wgraj</Button>
          {loading && (
            <>
              <Loader />
              <Text variant="lg" marginTop={"-45px"}>
                Wgrywanie...
              </Text>
            </>
          )}
          {message.success && (
            <Text color="green" fontSize={"xl"} marginTop={"30px"}>
              Pomyślnie wgrano nowe dane! Sprawdź je przechodząc do zakładki
              "Dane".
            </Text>
          )}
          {message.error && (
            <Text color="red" fontSize={"xl"} marginTop={"30px"}>
              Wystąpił błąd! Spróbuj ponownie lub skontaktuj się z
              administratorem.
            </Text>
          )}
        </Box>
      </Box>
    </center>
  );
};

export default Dashboard;
