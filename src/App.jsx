import { useState, useEffect } from "react";
import { Supabase } from "./supabase/client";
import "./App.css";

function App() {
  const [titleText, setTitleText] = useState("");
  const [timeNum, setTimeNum] = useState(0);
  const [titleEdit, setTitleEdit] = useState("");
  const [timeEdit, setTimeEdit] = useState();
  const [edit, setEdit] = useState(false);

  const [dataBase, setDataBase] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchDatabase = async () => {
    try {
      const { data, error } = await Supabase.from("study-record").select("*");
      setDataBase(data);
    } catch (error) {
      setErrorMessage("Error fetching notes", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchDatabase();
  }, []);

  const onChangeTitle = (e) => {
    return setTitleText(e.target.value);
  };
  const onChangeTime = (e) => {
    const num = parseInt(e.target.value);
    return setTimeNum(num);
  };
  const onClickAdd = async () => {
    const newRec = { title: titleText, time: timeNum };
    try {
      const { data, error } = await Supabase.from("study-record")
        .insert([newRec])
        .select();

      if (error) throw error;

      await fetchDatabase();
      setTitleText("");
      setTimeNum(0);
    } catch (error) {
      setErrorMessage("Error fetching notes", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onClickDelete = async (id) => {
    try {
      const { data, error } = await Supabase.from("study-record")
        .delete()
        .eq("id", id);

      if (error) throw error;

      await fetchDatabase();
    } catch (error) {
      setErrorMessage("Error fetching notes", error);
    } finally {
      setIsLoading(false);
    }
  };

  // const onChangeTitleEdit = (e) => {
  //   return setTitleEdit(e.target.value);
  // };
  // const onChangeTimeEdit = (e) => {
  //   const num = parseInt(e.target.value);
  //   return setTimeEdit(num);
  // };
  // const onClickEdit = (index) => {
  //   setEdit(index + 1);
  //   const newRecList = [...recList];
  //   setTitleEdit(newRecList[index].title);
  //   setTimeEdit(newRecList[index].time);
  // };
  // const onClickSave = (index) => {
  //   const newRecList = [...recList];
  //   newRecList[index] = { title: titleEdit, time: timeEdit };
  //   setRecList(newRecList);
  //   setEdit(false);
  //   setTitleEdit("");
  //   setTimeEdit(0);
  // };

  const recordsTimeSum = dataBase.reduce((sum, rec) => {
    return sum + rec.time;
  }, 0);

  const hasInputValueAll = Boolean(titleText && timeNum);

  return (
    <>
      <h1>学習記録一覧</h1>
      <div>
        <label>
          学習内容
          <input type="text" onChange={onChangeTitle} value={titleText} />
        </label>
        <br />
        <label>
          学習時間
          <input type="number" onChange={onChangeTime} value={timeNum} />
          時間
        </label>
        <p>入力されている学習内容：{titleText}</p>
        <p>入力されている時間：{timeNum}時間</p>
        <button onClick={onClickAdd} disabled={!hasInputValueAll || edit}>
          登録
        </button>
        {hasInputValueAll || <p>入力されていない項目があります</p>}
      </div>
      <div>
        {errorMessage || isLoading ? (
          <p>{errorMessage || "Loading..."}</p>
        ) : (
          <ul>
            {dataBase.map((data) => {
              return (
                <li key={data.id} style={{ display: "flex" }}>
                  <p>
                    {data.title}：{data.time}時間
                  </p>
                  {/* {edit === index + 1 ? (
                  <>
                    <input
                      type="text"
                      onChange={onChangeTitleEdit}
                      value={titleEdit}
                    />
                    <br />
                    <label>
                      <input
                        type="number"
                        onChange={onChangeTimeEdit}
                        value={timeEdit}
                      />
                      時間
                    </label>
                  </>
                ) : (
                  <p>
                    {rec.title}：{rec.time}時間
                  </p>
                )}
                {edit === index + 1 ? (
                  <button onClick={() => onClickSave(index)}>保存</button>
                ) : (
                  <button onClick={() => onClickEdit(index)}>編集</button>
                )} */}
                  <button
                    onClick={() => onClickDelete(data.id)}
                    disabled={edit}
                  >
                    削除
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        <p>
          合計時間：
          {recordsTimeSum}
          /1000(h)
        </p>
      </div>
    </>
  );
}

export default App;
