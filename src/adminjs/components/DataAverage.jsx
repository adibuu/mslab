import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Button,
  Loader,
  Text,
  DatePicker,
  Header,
} from "@adminjs/design-system";
import { ApiClient } from "adminjs";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import pl from "date-fns/locale/pl";

const api = new ApiClient();

const DataAverage = () => {
  const [loading, setLoading] = useState(true);
  const [ml, setMl] = useState();
  const [surnames, setSurnames] = useState();
  const mlOptions = useMemo(
    () => ml?.map((ml) => ({ value: ml, label: ml })),
    [ml]
  );
  const surnamesOptions = useMemo(
    () =>
      surnames?.map((surname) => ({
        value: surname,
        label: surname,
      })),
    [surnames]
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

  const onSubmitLKS = async (data) => console.log(data);

  const onSubmitOLD = async (data) => console.log(data);

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
              {surnames?.[0] && (
                <>
                  <Text marginTop={"20px"} marginBottom="5px" fontSize={"lg"}>
                    Nazwisko
                  </Text>
                  <Controller
                    control={controlLKS}
                    name="surnameLKS"
                    render={({ field: { onChange, value, ref } }) => (
                      <Select
                        onChange={(selectedValue) =>
                          onChange(selectedValue.value)
                        }
                        value={surnamesOptions.find((c) => value === c.value)}
                        ref={ref}
                        options={surnamesOptions}
                        placeholder="Wybierz..."
                        isClearable
                        noOptionsMessage={({ inputValue }) =>
                          !inputValue ? noOptionsText : "Brak opcji"
                        }
                      />
                    )}
                  />
                </>
              )}
              <Button marginTop={"20px"} type="submit">
                Oblicz
              </Button>
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
              {surnames?.[0] && (
                <>
                  <Text marginTop={"20px"} marginBottom="5px" fontSize={"lg"}>
                    Nazwisko
                  </Text>
                  <Controller
                    control={controlOLD}
                    name="surnameOLD"
                    render={({ field: { onChange, value, ref } }) => (
                      <Select
                        onChange={(selectedValue) =>
                          onChange(selectedValue.value)
                        }
                        value={surnamesOptions.find((c) => value === c.value)}
                        ref={ref}
                        options={surnamesOptions}
                        placeholder="Wybierz..."
                        isClearable
                        noOptionsMessage={({ inputValue }) =>
                          !inputValue ? noOptionsText : "Brak opcji"
                        }
                      />
                    )}
                  />
                </>
              )}
              <Button marginTop={"20px"} type="submit">
                Oblicz
              </Button>
            </Box>
          </form>
        </>
      )}
    </Box>
  );
};

export default DataAverage;
