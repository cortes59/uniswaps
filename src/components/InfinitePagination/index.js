import { Button, Select } from "antd";
import "./style.css";

const defaultSizeOptions = [10, 20, 50, 100];

const InfinitePagination = ({
  page,
  pageSize,
  sizeOptions = defaultSizeOptions,
  onChange,
}) => {
  const onPrev = () => {
    if (page === 1 || page === 0) return;
    onChange({ page: page - 1, pageSize });
  };

  const onNext = () => {
    onChange({ page: page + 1, pageSize });
  };

  const onSizeChange = (value) => {
    onChange({ page, pageSize: value });
  };

  return (
    <div className="infinity-pagination">
      <Button
        type="primary"
        size="small"
        disabled={page === 1}
        onClick={onPrev}
      >
        Previous
      </Button>
      <div>Page: {page}</div>
      <Select
        options={sizeOptions.map((option) => ({
          label: option,
          value: option,
        }))}
        value={pageSize}
        onChange={onSizeChange}
        size="small"
      />
      <Button type="primary" size="small" onClick={onNext}>
        Next
      </Button>
    </div>
  );
};

export default InfinitePagination;
