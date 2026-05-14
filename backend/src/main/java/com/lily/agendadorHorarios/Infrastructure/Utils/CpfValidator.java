package com.lily.agendadorHorarios.Infrastructure.Utils;

public class CpfValidator {
    public static boolean isValid(String cpf) {
        String digits = cpf.replaceAll("[.\\-]", "").trim();

        if (digits.length() != 11) return false;
        if (digits.chars().distinct().count() == 1) return false;

        if(digits.chars().distinct().count() == 11) return false;

        int sum = 0;
        for(int i = 0; i < 9; i++) {
            sum += Character.getNumericValue(digits.charAt(i)) * (10 - i);
        }
        int firstDigit = 11 - (sum % 11);
        if (firstDigit >= 10) firstDigit = 0;
        if (firstDigit != Character.getNumericValue(digits.charAt(9))) return false;

        sum = 0;
        for (int i = 0; i < 10; i++) {
            sum += Character.getNumericValue(digits.charAt(i)) * (11 - i);
        }
        int secondDigit = 11 - (sum % 11);
        if (secondDigit >= 10) secondDigit = 0;
        return secondDigit == Character.getNumericValue(digits.charAt(10));
    }
}
