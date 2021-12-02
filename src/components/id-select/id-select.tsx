import { BaseValue } from '../../types'
import { Select } from 'antd'
import React from 'react'

// 这里也可以直接从 antd 里面找到 Select 组件prop 的类型定义 ==> SelectProps
// 这里使用 react 自带的方法去查询类型
interface selectProps
    extends Omit<
        React.ComponentProps<typeof Select>,
        'value' | 'onChange' | 'options'
    > {
    value?: BaseValue | undefined | null
    onChange?: (value?: number) => void
    options?: { name: string; id: number }[]
    defaultOptionName?: string
}

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value))

/**
 * value 可以传入多种类型的值，但是会被转为 number
 * onChange 只会回调 number || undefined
 * 当选择默认选项时，onChange 会回调 undefined
 */
export const IdSelect = ({
    value,
    onChange,
    options,
    defaultOptionName,
    ...restProps
}: selectProps) => {
    return (
        <Select
            value={toNumber(value)}
            {...restProps}
            onChange={(value) => onChange?.(toNumber(value) || undefined)}
        >
            {defaultOptionName ? (
                <Select.Option value={0}>{defaultOptionName}</Select.Option>
            ) : null}
            {options?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                    {item.name}
                </Select.Option>
            ))}
        </Select>
    )
}
