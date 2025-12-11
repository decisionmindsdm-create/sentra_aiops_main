import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Badge,
  SparkAreaChart,
} from "@tremor/react";
import {
  getCommonPinningStylesAndClassNames,
  PageSubtitle,
  PageTitle,
  Tooltip,
} from "@/shared/ui";
import { useRouter, useSearchParams } from "next/navigation";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DeduplicationRule } from "@/app/(keep)/deduplication/models";
import DeduplicationSidebar from "@/app/(keep)/deduplication/DeduplicationSidebar";
import { TrashIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/20/solid";
import { useProviders } from "utils/hooks/useProviders";
import { useApi } from "@/shared/lib/hooks/useApi";
import { KeyedMutator } from "swr";
import { DynamicImageProviderIcon } from "@/components/ui";
import clsx from "clsx";

const columnHelper = createColumnHelper<DeduplicationRule>();

type DeduplicationTableProps = {
  deduplicationRules: DeduplicationRule[];
  mutateDeduplicationRules: KeyedMutator<DeduplicationRule[]>;
};

export const DeduplicationTable: React.FC<DeduplicationTableProps> = ({
  deduplicationRules,
  mutateDeduplicationRules,
}) => {
  const api = useApi();
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    data: providers = {
      installed_providers: [],
      linked_providers: [],
    },
  } = useProviders();

  useEffect(() => {
    console.log(providers);
  }, [providers]);

  let selectedId = searchParams ? searchParams.get("id") : null;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDeduplicationRule, setSelectedDeduplicationRule] =
    useState<DeduplicationRule | null>(null);

  const onDeduplicationClick = (rule: DeduplicationRule) => {
    setSelectedDeduplicationRule(rule);
    setIsSidebarOpen(true);
    router.push(`/deduplication?id=${rule.id}`);
  };

  const onCloseDeduplication = () => {
    setIsSidebarOpen(false);
    setSelectedDeduplicationRule(null);
    router.push("/deduplication");
  };

  const handleDeleteRule = async (
    rule: DeduplicationRule,
    event: React.MouseEvent
  ) => {
    event.stopPropagation();
    if (rule.default) return; // Don't delete default rules

    if (
      window.confirm("Are you sure you want to delete this deduplication rule?")
    ) {
      try {
        await api.delete(`/deduplications/${rule.id}`);

        await mutateDeduplicationRules();
      } catch (error) {
        console.error("Error deleting deduplication rule:", error);
      }
    }
  };

  useEffect(() => {
    if (selectedId && !isSidebarOpen) {
      const rule = deduplicationRules.find((r) => r.id === selectedId);
      if (rule) {
        setSelectedDeduplicationRule(rule);
        setIsSidebarOpen(true);
      }
    }
  }, [selectedId, deduplicationRules]);

  useEffect(() => {
    if (!isSidebarOpen && selectedId) {
      router.push("/deduplication");
    }
  }, [isSidebarOpen, selectedId, router]);

  const TOOLTIPS = {
    distribution:
      "Displays the number of alerts processed hourly over the last 24 hours. A consistent or high distribution indicates steady activity for this deduplication rule.",
    dedup_ratio:
      "Represents the percentage of alerts successfully deduplicated. Higher values indicate better deduplication efficiency, meaning fewer redundant alerts.",
  };

  function resolveDeleteButtonTooltip(
    deduplicationRule: DeduplicationRule
  ): string {
    if (deduplicationRule.default) {
      return "Cannot delete default rule";
    }

    if (deduplicationRule.is_provisioned) {
      return "Cannot delete provisioned rule.";
    }

    return "Delete Rule";
  }

  const DEDUPLICATION_TABLE_COLS = useMemo(
    () => [
      columnHelper.accessor("provider_type", {
        header: "",
        cell: (info) => {
          // Use Sentra icon for "keep" provider type
          const providerType = info.getValue();
          const iconProviderType = providerType === "keep" ? "sentra" : providerType;
          
          return (
            <div className="flex justify-center items-center">
              <DynamicImageProviderIcon
                className="inline-block"
                alt={info.getValue()}
                height={40}
                width={40}
                title={info.getValue()}
                providerType={iconProviderType}
                src={`/icons/${iconProviderType}-icon.png`}
              />
            </div>
          );
        },
      }),
      columnHelper.accessor("description", {
        header: "Description",
        cell: (info) => {
          const matchingProvider = providers.installed_providers.find(
            (provider) => provider.id === info.row.original.provider_id
          );
          const providerName =
            matchingProvider?.details.name ||
            info.row.original.provider_id ||
            "Sentra";

          // Transform "keep default" to "Sentra default" in description
          let displayDescription = info.row.original.description || `${providerName} deduplication rule`;
          if (displayDescription.toLowerCase().includes('keep default')) {
            displayDescription = displayDescription.replace(/keep default/gi, 'Sentra default');
          }

          return (
            <div className="flex flex-row items-center max-w-[320px]">
              <span className="truncate lg:whitespace-normal flex-grow">
                {displayDescription}
              </span>
              <div className="flex items-center ml-2">
                {info.row.original.default ? (
                  <Badge color="gray" size="xs" className="mx-1">
                    Default
                  </Badge>
                ) : (
                  <Badge color="orange" size="xs" className="mx-1">
                    Custom
                  </Badge>
                )}
                {info.row.original.full_deduplication && (
                  <Badge size="xs" className="ml-1 bg-[#e6f4f9] text-[#0d88c0] border-[#0d88c0]">
                    Full Deduplication
                  </Badge>
                )}
              </div>
            </div>
          );
        },
      }),
      columnHelper.accessor("ingested", {
        header: "Ingested",
        cell: (info) => (
          <div className="min-w-16 text-right">{info.getValue() || 0}</div>
        ),
        meta: {
          align: "right",
        },
      }),
      columnHelper.accessor("dedup_ratio", {
        header: "Dedup Ratio",
        cell: (info) => {
          let formattedValue;
          if (info.row.original.ingested === 0) {
            formattedValue = "Unknown yet";
          } else {
            const value = info.getValue() || 0;
            formattedValue = `${Number(value).toFixed(1)}%`;
          }
          return <p className="text-right">{formattedValue}</p>;
        },
        meta: {
          align: "right",
        },
      }),
      columnHelper.accessor("distribution", {
        header: "Distribution",
        cell: (info) => {
          const rawData = info.getValue();
          const maxNumber = Math.max(...rawData.map((item) => item.number));
          const allZero = rawData.every((item) => item.number === 0);
          const data = rawData.map((item) => ({
            ...item,
            number: maxNumber > 0 ? item.number / maxNumber + 1 : 0.5,
          }));
          const colors = ["#0d88c0"];
          const showGradient = true;
          return (
            <SparkAreaChart
              data={data}
              categories={["number"]}
              index="hour"
              className="h-10 w-36"
              colors={colors}
              showGradient={showGradient}
              minValue={allZero ? 0 : undefined}
              maxValue={allZero ? 1 : undefined}
            />
          );
        },
      }),
      columnHelper.accessor("fingerprint_fields", {
        header: "Fields",
        cell: (info) => {
          const fields = info.getValue();
          const ignoreFields = info.row.original.ignore_fields;
          const displayFields =
            fields && fields.length > 0 ? fields : ignoreFields;

          if (!displayFields || displayFields.length === 0) {
            return (
              <div className="flex flex-wrap items-center gap-2 w-[200px]">
                <Badge size="md" className="bg-[#e6f4f9] text-[#0d88c0] border-[#0d88c0]">
                  N/A
                </Badge>
              </div>
            );
          }

          return (
            <div className="flex flex-wrap items-center gap-2 w-[200px]">
              {displayFields.map((field: string, index: number) => (
                <React.Fragment key={field}>
                  {index > 0 && <PlusIcon className="w-4 h-4 text-gray-400" />}
                  <Badge size="md" className="bg-[#e6f4f9] text-[#0d88c0] border-[#0d88c0]">
                    {field}
                  </Badge>
                </React.Fragment>
              ))}
            </div>
          );
        },
      }),
      columnHelper.display({
        id: "actions",
        cell: (info) => (
          <div className="flex justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity w-full">
            {/* <Button
              size="xs"
              variant="secondary"
              icon={PauseIcon}
              tooltip="Disable Rule"
            /> */}
            <Button
              size="xs"
              variant="secondary"
              color="red"
              icon={TrashIcon}
              tooltip={resolveDeleteButtonTooltip(info.row.original)}
              disabled={
                info.row.original.default || info.row.original.is_provisioned
              }
              onClick={(e) => handleDeleteRule(info.row.original, e)}
            />
          </div>
        ),
      }),
    ],
    [providers]
  );

  const table = useReactTable({
    getRowId: (row) => row.id,
    data: deduplicationRules,
    state: {
      columnPinning: {
        right: ["actions"],
      },
    },
    columns: DEDUPLICATION_TABLE_COLS,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleSubmitDeduplicationRule = async (
    data: Partial<DeduplicationRule>
  ) => {
    // Implement the logic to submit the deduplication rule
    // This is a placeholder function, replace with actual implementation
    console.log("Submitting deduplication rule:", data);
    // Add API call or state update logic here
  };

  return (
    <div className="flex-1 flex flex-col h-full gap-6">
      <div className="flex items-center justify-between">
        <div>
          <PageTitle>
            Deduplication Rules{" "}
            <span className="text-gray-400">
              ({deduplicationRules?.length})
            </span>
          </PageTitle>
          <PageSubtitle>
            Set up rules to deduplicate similar alerts
          </PageSubtitle>
        </div>
        <Button
          onClick={() => {
            setSelectedDeduplicationRule(null);
            setIsSidebarOpen(true);
          }}
          icon={PlusIcon}
          variant="primary"
          size="md"
          className="bg-[#0d88c0] hover:bg-[#0b76a8] border-[#0d88c0] text-white"
        >
          Create Deduplication Rule
        </Button>
      </div>
      <Card className="p-0">
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-tremor-border dark:border-dark-tremor-border"
              >
                {headerGroup.headers.map((header) => {
                  const { style, className } =
                    getCommonPinningStylesAndClassNames(
                      header.column,
                      table.getState().columnPinning.left?.length,
                      table.getState().columnPinning.right?.length
                    );

                  return (
                    <TableHeaderCell
                      key={header.id}
                      className={clsx(
                        header.column.columnDef.meta?.thClassName,
                        "px-3 py-2"
                      )}
                    >
                      <span
                        className={clsx(
                          header.column.columnDef.meta?.align === "right" &&
                            "flex justify-end",
                          "flex items-center"
                        )}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {Object.keys(TOOLTIPS).includes(header.id) && (
                          <Tooltip
                            content={
                              <>
                                {TOOLTIPS[header.id as keyof typeof TOOLTIPS]}
                              </>
                            }
                            className="z-50"
                          >
                            <QuestionMarkCircleIcon className="w-4 h-4 ml-1 text-gray-400" />
                          </Tooltip>
                        )}
                      </span>
                    </TableHeaderCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="cursor-pointer hover:bg-slate-50 group"
                onClick={() => onDeduplicationClick(row.original)}
              >
                {row.getVisibleCells().map((cell) => {
                  const { style, className } =
                    getCommonPinningStylesAndClassNames(
                      cell.column,
                      table.getState().columnPinning.left?.length,
                      table.getState().columnPinning.right?.length
                    );
                  return (
                    <TableCell
                      key={cell.id}
                      className={clsx(
                        cell.column.columnDef.meta?.tdClassName,
                        className,
                        "px-3 py-2"
                      )}
                      style={style}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <DeduplicationSidebar
        mutateDeduplicationRules={mutateDeduplicationRules}
        isOpen={isSidebarOpen}
        toggle={onCloseDeduplication}
        selectedDeduplicationRule={selectedDeduplicationRule}
        onSubmit={handleSubmitDeduplicationRule}
        providers={providers}
      />
    </div>
  );
};
