import classNames from 'classnames';

export const toggleClassNameExpenseInput = state =>
  classNames('vw-50  align-items-center', {
    'disappear': state.input === 'disappear',
    'card': state.input !== 'disappear'
  });

export const toggleClassNameBlur = state => classNames('', {
  'blur': state.input !== 'disappear'
});

export const toggleRemoveIncomeButton = state =>
  classNames('w-25 gradient-custom-4 text-dark', {
    'disappear': state.input !== 'disappear',
    'graph-thumbnail': state.input === 'appear',
    'card vw-50  align-items-center': state.input !== 'appear'
  });

export const toggleRemoveMapview = state =>
  classNames('text-center w-50', {
    'disappear': state.input !== 'disappear',
    'btn card': state.input === 'disappear'
  });