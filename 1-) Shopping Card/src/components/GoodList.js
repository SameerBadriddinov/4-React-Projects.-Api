import { GoodItem } from "./GoodItem";

function GoodList(props) {
  const { goods = [], addToBasket } = props;

  if (!goods.length) {
    return <h3>Nothing here</h3>;
  }

  return (
    <div className="goods">
      {goods.map((item) => (
        <GoodItem key={item.id} {...item} addToBasket={addToBasket} />
      ))}
    </div>
  );
}

export { GoodList };
