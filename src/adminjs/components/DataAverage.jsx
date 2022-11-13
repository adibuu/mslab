import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Loader,
  Text,
  DatePicker,
  Header,
} from "@adminjs/design-system";
import { ApiClient } from "adminjs";
import axios from "axios";
import Select from "react-select";

const api = new ApiClient();

const DataAverage = () => {
  const [loading, setLoading] = useState(true);
  const [ml, setMl] = useState();
  const [surnames, setSurnames] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.resourceAction({
        resourceId: "Data",
        actionName: "list",
      });

      setMl([
        ...new Set(
          data?.data?.records
            ?.map((record) => record?.params?.ml)
            ?.sort((a, b) => a - b)
        ),
      ]);

      setSurnames([
        ...new Set(
          data?.data?.records
            ?.map((record) => record?.params?.surname)
            ?.sort((a, b) => a?.localeCompare(b))
        ),
      ]);

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Box variant="grey">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box variant="card">
            <Header>Oblicz wartość LKS</Header>
            <Text fontSize={"lg"} marginBottom="5px">
              Data
            </Text>
            <DatePicker />
            <Text marginTop={"20px"} fontSize={"lg"} marginBottom="5px">
              Numer ML
            </Text>
            <Select
              options={ml?.map((ml) => ({ value: ml, label: ml }))}
              placeholder="Wybierz..."
              isClearable
              noOptionsMessage={({ inputValue }) =>
                !inputValue ? noOptionsText : "Brak opcji"
              }
            />
            {surnames?.[0] && (
              <>
                <Text marginTop={"20px"} marginBottom="5px" fontSize={"lg"}>
                  Nazwisko
                </Text>
                <Select
                  options={surnames?.map((surname) => ({
                    value: surname,
                    label: surname,
                  }))}
                  placeholder="Wybierz..."
                  isClearable
                  noOptionsMessage={({ inputValue }) =>
                    !inputValue ? noOptionsText : "Brak opcji"
                  }
                />
              </>
            )}
            <Button marginTop={"20px"}>Oblicz</Button>
          </Box>

          <Box variant="card" marginTop={"50px"}>
            <Header>Oblicz wartość OLD</Header>
            <Text fontSize={"lg"} marginBottom="5px">
              Data
            </Text>
            <DatePicker />
            <Text marginTop={"20px"} fontSize={"lg"} marginBottom="5px">
              Numer ML
            </Text>
            <Select
              options={ml?.map((ml) => ({ value: ml, label: ml }))}
              placeholder="Wybierz..."
              isClearable
              noOptionsMessage={({ inputValue }) =>
                !inputValue ? noOptionsText : "Brak opcji"
              }
            />
            {surnames?.[0] && (
              <>
                <Text marginTop={"20px"} marginBottom="5px" fontSize={"lg"}>
                  Nazwisko
                </Text>
                <Select
                  options={surnames?.map((surname) => ({
                    value: surname,
                    label: surname,
                  }))}
                  placeholder="Wybierz..."
                  isClearable
                  noOptionsMessage={({ inputValue }) =>
                    !inputValue ? noOptionsText : "Brak opcji"
                  }
                />
              </>
            )}
            <Button marginTop={"20px"}>Oblicz</Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default DataAverage;
