import useStyles from './Card.styles';

const Card = ({ children, className }) => {
  const { classes, cx } = useStyles();

  return <div className={cx(classes.card, className)}>{children}</div>;
};

export default Card;
