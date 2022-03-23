import { useState, useEffect } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useFirestore } from "../../hooks/useFirestore";

const Form = ({ uid }) => {
  const { addingDoc, response } = useFirestore("harcamalar");
  const [title, setTitle] = useState("");
  const [count, setCount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addingDoc({ uid, title, count });
  };

  useEffect(() => {
    if (response.success) {
      setTitle("");
      setCount("");
    }
  }, [response.success]);
  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Typography variant="h6" color="darkslateblue">
        Harcama bilgisini giriniz...
      </Typography>
      <TextField
        label="Harcama Başlık"
        variant="outlined"
        fullWidth
        required
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <TextField
        label="Harcama Miktarı"
        variant="outlined"
        fullWidth
        required
        onChange={(e) => setCount(e.target.value)}
        value={count}
        sx={{ my: 5 }}
      />
      <Button variant="contained" color="secondary" type="submit">
        Ekle
      </Button>
    </form>
  );
};
export default Form;
