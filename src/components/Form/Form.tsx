import { Button } from '@douyinfe/semi-ui';

import { useElonForm } from './useForm';

export const ElonForm = ({
  onSubmit,
  onError,
  className,
  trigger,
  style = {},
  formItems = [],
  row = false,
}: any) => {
  const { sections, submit, isSubmitting } = useElonForm(
    formItems,
    onSubmit,
    onError,
    row,
  );

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className={
        className ||
        'p-4 grid gap-4 rounded-md shadow-md bg-gray-50 dark:bg-gray-500'
      }
      style={style}
    >
      {Object.values(sections)}

      {trigger ? (
        trigger({ submit, isSubmitting })
      ) : (
        <Button loading={isSubmitting} onClick={submit}>
          确定
        </Button>
      )}
    </form>
  );
};
