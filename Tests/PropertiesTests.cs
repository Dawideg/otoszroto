using Api.Features.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace Tests
{
    public class PropertiesTests
    {

        private class TestObject
        {
            public string Name { get; set; } = "Dawid";
            public int Age { get; set; } = 19;
        }

        [Fact]
        public void GetPropValue_ShouldReturnPropertyValue()
        {
            var obj = new TestObject();

            var result = Properties.GetPropValue<string>(obj, "Name");

            Assert.Equal("Dawid", result);
        }

        [Fact]
        public void GetPropValue_ShouldReturnValueOfDifferentPropertyType()
        {
            var obj = new TestObject();

            var result = Properties.GetPropValue<int>(obj, "Age");

            Assert.Equal(19, result);
        }

        [Fact]
        public void GetPropValue_ShouldThrowArgumentNullException_WhenObjectIsNull()
        {
            Assert.Throws<ArgumentNullException>(() =>
                Properties.GetPropValue<string>(null!, "Name"));
        }

        [Fact]
        public void GetPropValue_ShouldThrowArgumentException_WhenPropertyDoesNotExist()
        {
            var obj = new TestObject();

            var exception = Assert.Throws<ArgumentException>(() =>
                Properties.GetPropValue<string>(obj, "NonExistingProperty"));

            Assert.Contains("TestObject does not contain NonExistingProperty property", exception.Message);
        }
    }
}
