import "./input.css";

const Title = (props) => {
  return <div class="form__header">{props.title}</div>;
};

const Input = (props) => {
  return (
    <div class="form__input">
      <img className="form__icon" src={props.icon}></img>
      <input
        name={props.name}
        placeholder={props.placeholder}
        type={props.type}
        maxlength="64"
        minlength="7"
        required
      />
    </div>
  );
};

const Button = (props) => {
  return (
    <div class="form__button">
      <button type={props.type} name={props.name}>
        {props.value}
      </button>
      <span>{props.info} </span>
      <a>{props.data}</a>
    </div>
  );
};

export { Title, Input, Button };
