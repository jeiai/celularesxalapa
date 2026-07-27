export function Analytics() {
  const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID;

  if (!analyticsId) {
    return null;
  }

  return (
    <script
      defer
      data-analytics-id={analyticsId}
      dangerouslySetInnerHTML={{
        __html:
          "window.cxAnalytics={track:(event,payload)=>console.info('[analytics]',event,payload)};"
      }}
    />
  );
}
