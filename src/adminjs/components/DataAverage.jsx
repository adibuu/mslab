import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Button,
  Loader,
  Text,
  DatePicker,
  Header,
} from "@adminjs/design-system";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import pl from "date-fns/locale/pl";

const API_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:3001";

const DataAverage = () => {
  const [loading, setLoading] = useState(true);
  const [ml, setMl] = useState();
  const mlOptions = useMemo(
    () =>
      ml?.map((ml) => ({
        value: ml,
        label: `${ml?.ml} ${ml?.surname ? `(${ml?.surname})` : ""}`,
      })),
    [ml]
  );
  const {
    control: controlLKS,
    handleSubmit: handleSubmitLKS,
    formState: { errors: errorsLKS, isSubmitting: isSubmittingLKS },
  } = useForm();
  const {
    control: controlOLD,
    handleSubmit: handleSubmitOLD,
    formState: { errors: errorsOLD, isSubmitting: isSubmittingOLD },
  } = useForm();
  const [avarageLKS, setAvarageLKS] = useState({
    success: null,
    error: false,
  });
  const [avarageOLD, setAvarageOLD] = useState({
    success: null,
    error: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${API_URL}/data`);

      setMl(
        [...new Set(res.data.map(({ ml }) => ml))]
          .map((e) => res.data.find(({ ml }) => ml == e))
          ?.map((document) => ({
            ml: document?.ml,
            surname: document?.surname,
          }))
          ?.sort((a, b) => a.ml - b.ml)
      );

      setLoading(false);
    };

    fetchData();
  }, []);

  const onSubmitLKS = async (data) => {
    try {
      const res = await axios.post(`${API_URL}/data/lks`, {
        date: data?.dateLKS,
        ml: data?.mlLKS?.ml,
      });

      if (res.status === 200)
        setAvarageLKS({
          error: false,
          success: res.data,
        });
    } catch (error) {
      setAvarageLKS({
        success: null,
        error: true,
      });
    }
  };

  const onSubmitOLD = async (data) => {
    try {
      const res = await axios.post(`${API_URL}/data/old`, {
        date: data?.dateOLD,
        ml: data?.mlOLD?.ml,
      });

      if (res.status === 200)
        setAvarageOLD({
          error: false,
          success: res.data,
        });
    } catch (error) {
      setAvarageOLD({
        success: null,
        error: true,
      });
    }
  };

  return (
    <Box variant="grey">
      {loading ? (
        <Loader />
      ) : (
        <>
          <form onSubmit={handleSubmitLKS(onSubmitLKS)}>
            <Box variant="card">
              <Header>Oblicz wartość LKS</Header>
              <Text fontSize={"lg"} marginBottom="5px">
                Data
              </Text>
              <Controller
                control={controlLKS}
                name="dateLKS"
                rules={{ required: true }}
                render={({ field: { onChange, value, ref } }) => (
                  <DatePicker
                    onChange={onChange}
                    value={value}
                    locale={pl}
                    ref={ref}
                    propertyType="date"
                  />
                )}
              />
              {errorsLKS.dateLKS && (
                <Text mt={3} color="red">
                  Data jest wymagana
                </Text>
              )}
              <Text marginTop={"20px"} fontSize={"lg"} marginBottom="5px">
                Numer ML
              </Text>
              <Controller
                control={controlLKS}
                name="mlLKS"
                rules={{ required: true }}
                render={({ field: { onChange, value, ref } }) => (
                  <Select
                    onChange={(selectedValue) => onChange(selectedValue.value)}
                    value={mlOptions.find((c) => value === c.value)}
                    ref={ref}
                    options={mlOptions}
                    placeholder="Wybierz..."
                    isClearable
                    noOptionsMessage={({ inputValue }) =>
                      !inputValue ? noOptionsText : "Brak opcji"
                    }
                  />
                )}
              />
              {errorsLKS.mlLKS && (
                <Text mt={3} color="red">
                  Pole wymagane
                </Text>
              )}
              {isSubmittingLKS ? (
                <Loader />
              ) : (
                <Button marginTop={"20px"} type="submit">
                  Oblicz
                </Button>
              )}

              {avarageLKS.success && (
                <Text
                  fontSize={"xl"}
                  marginTop={"30px"}
                  fontWeight="bolder"
                >{`Wynik: ${avarageLKS.success?.avarage}`}</Text>
              )}
              {avarageLKS.error && (
                <Text color="red" fontSize={"xl"} marginTop={"30px"}>
                  Wystąpił błąd! Spróbuj ponownie lub skontaktuj się z
                  administratorem.
                </Text>
              )}
            </Box>
          </form>

          <form onSubmit={handleSubmitOLD(onSubmitOLD)}>
            <Box variant="card" marginTop={"50px"}>
              <Header>Oblicz wartość OLD</Header>
              <Text fontSize={"lg"} marginBottom="5px">
                Data
              </Text>
              <Controller
                control={controlOLD}
                name="dateOLD"
                rules={{ required: true }}
                render={({ field: { onChange, value, ref } }) => (
                  <DatePicker
                    onChange={onChange}
                    value={value}
                    locale={pl}
                    ref={ref}
                    propertyType="date"
                  />
                )}
              />
              {errorsOLD.dateOLD && (
                <Text mt={3} color="red">
                  Data jest wymagana
                </Text>
              )}
              <Text marginTop={"20px"} fontSize={"lg"} marginBottom="5px">
                Numer ML
              </Text>
              <Controller
                control={controlOLD}
                name="mlOLD"
                rules={{ required: true }}
                render={({ field: { onChange, value, ref } }) => (
                  <Select
                    onChange={(selectedValue) => onChange(selectedValue.value)}
                    value={mlOptions.find((c) => value === c.value)}
                    ref={ref}
                    options={mlOptions}
                    placeholder="Wybierz..."
                    isClearable
                    noOptionsMessage={({ inputValue }) =>
                      !inputValue ? noOptionsText : "Brak opcji"
                    }
                  />
                )}
              />
              {errorsOLD.mlOLD && (
                <Text mt={3} color="red">
                  Pole wymagane
                </Text>
              )}
              {isSubmittingOLD ? (
                <Loader />
              ) : (
                <Button marginTop={"20px"} type="submit">
                  Oblicz
                </Button>
              )}

              {avarageOLD.success && (
                <Text
                  fontSize={"xl"}
                  marginTop={"30px"}
                  fontWeight="bolder"
                >{`Wynik: ${avarageOLD.success?.avarage}`}</Text>
              )}
              {avarageOLD.error && (
                <Text color="red" fontSize={"xl"} marginTop={"30px"}>
                  Wystąpił błąd! Spróbuj ponownie lub skontaktuj się z
                  administratorem.
                </Text>
              )}
            </Box>
          </form>
        </>
      )}
    </Box>
  );
};

export default DataAverage;
