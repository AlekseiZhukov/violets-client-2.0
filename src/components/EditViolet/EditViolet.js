import React, { useEffect, useRef } from "react";
import s from "./EditViolet.module.scss";
import { useForm } from "react-hook-form";
import cn from "classnames";
import { useUpdateVioletMutation } from "../../api/violetsAPI";

const EditViolet = ({ closeEditVioletModule, violetData }) => {
  console.log("EditViolet render", violetData);
  const {
    titleSlug,
    nameViolet,
    description,
    availability,
    availabilityForSlider,
    quantity,
    pricesStarter,
    pricesBaby,
    pricesLeaf,
    pricesAdultViolet,
  } = violetData;
  const myFile = useRef();
  const [edit, { error: errorEdit, data: dataEdit, isSuccess }] =
    useUpdateVioletMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description,
      availability,
      availabilityForSlider,
      quantity,
      pricesBaby,
      pricesLeaf,
      pricesStarter,
      pricesAdultViolet,
    },
  });
  const handleEditViolet = async (titleSlug, data) => {
    console.log("handleEditViolet ", data, titleSlug);
    await edit({ titleSlug, data });
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    const file = myFile.current;
    for (let key in data) {
      if (key !== "image") {
        formData.append(key, data[key]);
      }
    }
    if (file) {
      formData.append("image", file);
    }
    formData.append("titleSlug", titleSlug);
    handleEditViolet(titleSlug, formData);

    for (let [item, value] of formData) {
      console.log(`${item}: ${value}`);
    }
  };

  const handleCancelButton = () => {
    closeEditVioletModule();
  };
  useEffect(() => {
    isSuccess && setTimeout(handleCancelButton, 900);
  }, [isSuccess]);
  useEffect(() => {
    document.querySelector("body").style.overflow = "hidden";
    return () => {
      document.querySelector("body").style.overflow = "visible";
    };
  }, []);

  return (
    <div className={s.root}>
      <div className={s.wrap}>
        <h2>Редактирование фиалки:</h2>
        <h3>{nameViolet}</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.inputModule}>
            <label>Описание: </label>
            <textarea
              className={cn({ [s.error]: errors.description })}
              placeholder="описание фиалки"
              {...register("description", { required: "обязательное поле" })}
            />
            {errors.description && <span>{errors.description.message}</span>}
          </div>
          <div className={s.wrapCheckbox}>
            <div>
              <label>Доступна к продаже: </label>
              <input type={"checkbox"} {...register("availability")} />
            </div>
            <div>
              <label>Показать в слайдере: </label>
              <input type={"checkbox"} {...register("availabilityForSlider")} />
            </div>
          </div>
          <div className={s.wrapNumberInput}>
            <div>
              <label>Колличество: </label>
              <input
                className={cn({ [s.error]: errors.quantity })}
                type={"number"}
                {...register("quantity", {
                  required: "обязательное поле",
                  min: { value: 0, message: "не может быть меньше 0" },
                })}
              />
              {errors.quantity && <span>{errors.quantity.message}</span>}
            </div>

            <div>
              <label>Цена детки: </label>
              <input
                className={cn({ [s.error]: errors.pricesBaby })}
                type={"number"}
                {...register("pricesBaby", {
                  required: "обязательное поле",
                  min: { value: 0, message: "не может быть меньше 0" },
                })}
              />
              {errors.pricesBaby && <span>{errors.pricesBaby.message}</span>}
            </div>
            <div>
              <label>Цена листочка: </label>
              <input
                className={cn({ [s.error]: errors.pricesLeaf })}
                type={"number"}
                {...register("pricesLeaf", {
                  required: "обязательное поле",
                  min: { value: 0, message: "не может быть меньше 0" },
                })}
              />
              {errors.pricesLeaf && <span>{errors.pricesLeaf.message}</span>}
            </div>
            <div>
              <label>Цена стартера: </label>
              <input
                className={cn({ [s.error]: errors.pricesStarter })}
                type={"number"}
                {...register("pricesStarter", {
                  required: "обязательное поле",
                  min: { value: 0, message: "не может быть меньше 0" },
                })}
              />
              {errors.pricesStarter && (
                <span>{errors.pricesStarter.message}</span>
              )}
            </div>
            <div>
              <label>Цена взрослого цветка: </label>
              <input
                className={cn({ [s.error]: errors.pricesAdultViolet })}
                type={"number"}
                {...register("pricesAdultViolet", {
                  required: "обязательное поле",
                  min: { value: 0, message: "не может быть меньше 0" },
                })}
              />
              {errors.pricesAdultViolet && (
                <span>{errors.pricesAdultViolet.message}</span>
              )}
            </div>
          </div>
          <div>
            <label>Загрузить фотографию: </label>
            <input
              className={cn({ [s.error]: errors.photo })}
              type={"file"}
              accept={"image/gif, image/png, image/jpeg"}
              {...register("image", {
                onChange: (e) => {
                  if (e.target.files.length) {
                    myFile.current = e.target.files[0];
                  }
                },
              })}
            />
            {errors.photo && <span>{errors.photo.message}</span>}
          </div>
          <div className={s.wrapperButtonBox}>
            <button
              type="submit"
              onClick={() => {
                console.log("submit фиалку");
              }}
            >
              создать
            </button>
            {errorEdit && <p>{errorEdit.data.message}</p>}

            {dataEdit && <p>{dataEdit.message}</p>}
            <button type="button" onClick={handleCancelButton}>
              Отменить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditViolet;
