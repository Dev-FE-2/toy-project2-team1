import * as S from './MainLayout.styles';

export function MainLayout() {
	const workPercentage = 75;

	return (
		<S.MainContainer>
			<S.FlexContainer>
				<S.LeftSection>
					<S.CategoryTitle>카테고리</S.CategoryTitle>
					<S.CategoryList>
						<S.CategoryItem>
							<span>오픈</span>
						</S.CategoryItem>
						<S.CategoryItem>
							<span>미들</span>
						</S.CategoryItem>
						<S.CategoryItem>
							<span>마감</span>
						</S.CategoryItem>
						<S.CategoryItem>
							<span>예약</span>
						</S.CategoryItem>
						<S.CategoryItem>
							<span>예정</span>
						</S.CategoryItem>
						<S.CategoryItem>
							<span>품평회</span>
						</S.CategoryItem>
					</S.CategoryList>
				</S.LeftSection>

				<S.MiddleSection>
					<div>Calendar Placeholder</div>
				</S.MiddleSection>

				<S.RightSection>
					<S.WorkingHoursContainer>
						<S.WorkingHoursWrapper>
							<S.WorkingHoursInfo>
								<S.InfoLabel>이번 주 근무 시간</S.InfoLabel>
								<S.InfoValue>10시간 10분</S.InfoValue>
							</S.WorkingHoursInfo>
							<S.WorkingHoursInfo>
								<S.InfoLabel>이번 달 근무 시간</S.InfoLabel>
								<S.InfoValue>40시간 20분</S.InfoValue>
							</S.WorkingHoursInfo>
						</S.WorkingHoursWrapper>
						<S.ChartContainer>
							<S.WorkTimeChart $percentage={workPercentage}>
								<S.ChartCenter>{workPercentage}%</S.ChartCenter>
							</S.WorkTimeChart>
						</S.ChartContainer>
					</S.WorkingHoursContainer>

					<S.PayrollContainer>
						<S.PayrollTitle>급여 명세서</S.PayrollTitle>
					</S.PayrollContainer>
				</S.RightSection>
			</S.FlexContainer>
		</S.MainContainer>
	);
}
