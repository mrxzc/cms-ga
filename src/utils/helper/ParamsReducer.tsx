export const reduceParamsFunc = (params: any) => {
  const tempParams = params

  Object.keys(tempParams).forEach(key => {
    if (!tempParams[key as keyof any]) {
      delete tempParams[key as keyof any]
    }
  })

  return tempParams
}
